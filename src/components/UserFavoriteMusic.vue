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
    dailySongIds: {
      type: Array,
      required: true,
      default() {
        return [];
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
    getSongInfoByFetch(songIds) {
      let url = `${global.server}/song/detail?ids=${songIds.join(",")}`;
      debugger;
      return fetch(url, {
        method: "GET",
        headers: {
          Origin: "http://localhost:8080",
        },
        credentials: "include",
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log(this.dailySongIds);
    next();
    // this.getSongInfoByFetch(this.favoriteSongIds)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((result) => {
    //     this.musicList = result.songs;
    //   })
    //   .catch((reason) => {
    //     console.log(reason);
    //   });
  },
  mounted() {
    // 初次进入时，默认显示今日推荐歌曲
    // debugger;
    console.log(this.dailySongIds);
    // this.getSongInfoByFetch(this.dailySongIds)
    //   .then((res) => {
    //     console.log(1);
    //     return res.json();
    //   })
    //   .then((result) => {
    //     console.log(2);
    //     this.musicList = result.songs;
    //   })
    //   .catch((reason) => {
    //     console.log(3);
    //     console.log(reason);
    //   });
  },
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