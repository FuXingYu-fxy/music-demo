<template>
  <div class="today-music">
    <p class="today-recommended-text">{{ playlistTitle }}</p>
    <table>
      <tr v-for="music of musicList.songs" :key="music.id">
        <td>
          <a
            class="music-name-link"
            @click="selectMusic(music.id, music.name)"
            >{{ music.name }}</a
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import global from "../js/global";
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
        return ['初始值呢'];
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
    selectMusic(musicId, titleName) {
      document.title = "正在播放  " + titleName;
      this.$root.$children[0].currentMusicUrl = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
    },
    setSongInfoByFetch(songIds) {
      let url = `${global.server}/song/detail?ids=${songIds.join(",")}`;
      // debugger;
      let vm = this;
      fetch(url, {
        method: "GET",
        headers: {
          Origin: 'http://localhost:8080'
        },
        credentials: 'include'
      })
      .then(res => {
        return res.json();
      })
      .then(result => this.musicList = result)
      .catch(reason => console.log(reason));
    },
  },
  watch: {
    favoriteSongIds(newValue) {
      this.setSongInfoByFetch(newValue); // 或者 this.favoriteSongIds
    },
    // 因为父组件的值不知道何时传过来，所以在这里监听dailySongIds
    dailySongIds(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.setSongInfoByFetch(newValue);
    }
  },
};
export default vm;
</script>

<style scpoed>
.today-music {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: inherit;
}
.today-recommended-text {
  position: sticky;
  top: 0.5px;
  background-color: white;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 20rem;
}

.music-name-link {
  cursor: pointer;
}

.music-name-link:hover {
  color: aquamarine;
}
</style>