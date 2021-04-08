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
      default: "",
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
  },
  beforeRouteUpdate(to, from, next) {
    let url = `${global.server}/song/detail?ids=${this.favoriteSongIds.join(",")}`;
    fetch(url, {
      method: "GET",
      headers: {
        Origin: "http://localhost:8080",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.musicList = result;
      })
      .catch((reason) => {
        console.log(reason);
      });
  },
  mounted() {},
};
export default vm;
</script>

<style scpoed>
.today-recommended-text {
  position: sticky;
  top: 0.5px;
  background-color: white;
  margin: 0;
}
.today-music {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.music-name-link {
  cursor: pointer;
}

.music-name-link:hover {
  color: aquamarine;
}
</style>