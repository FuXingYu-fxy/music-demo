<template>
  <div class="today-music">
    <p class="today-recommended-text">{{ playlistTitle }}</p>
    <ul>
      <li v-for="music of musicList.songs" :key="music.id">
        <a 
        class="music-name-link" 
        @click="selectMusic(music)" 
        >
        {{ music.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import global from "../js/global";
import utils from "../js/utils";
const vm = {
  name: "",
  props: {
    favoriteSongIds: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    playlistTitle: {
      type: String,
      required: true,
      default: "今日推荐",
    },
    dailySongIds: {
      type: Array,
      required: true,
      default() {
        return ["初始值呢"];
      },
    },
  },
  data() {
    return {
      musicList: [],
    };
  },
  components: {},
  methods: {
    selectMusic(musicInfo) {
      // this.$root.$children[0].currentMusicUrl = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
      this.$root.$children[0].musicInfo = musicInfo;
    },
    getSongInfoByFetch: utils.getSongInfoByFetch
  },
  watch: {
    favoriteSongIds(newValue) {
      this.getSongInfoByFetch(newValue)
      .then(value => this.musicList = value); // 或者 this.favoriteSongIds
    },
    // 因为父组件的值不知道何时传过来，所以在这里监听dailySongIds
    dailySongIds(newValue) {
      this.getSongInfoByFetch(newValue)
      .then(value => this.musicList = value);
    },
  },
};
export default vm;
</script>

<style scpoed>
.today-music {
  width: 100%;
}
.today-recommended-text {
  margin: 0;
  position: sticky;
  top: 0;
  color: white;
  background: orange;
}

.today-music ul {
  margin: 0;
  padding: 0 0 0 2px;
}
.today-music ul li {
  list-style: none;
}
.today-music ul li a {
  display: block;
  min-width: 100px;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.today-music ul li a:hover {
  color: aquamarine;
}
</style>