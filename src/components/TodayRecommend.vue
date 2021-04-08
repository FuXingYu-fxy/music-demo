<template>
  <div class="today-music">
    <p class="today-recommended-text">今日推荐</p>
    <table>
      <tr v-for="music of dailySongs.data.dailySongs" :key="music.id">
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
export default {
  name: "",
  props: {
    dailySongs: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // dailySongs, 作为属性传入
    };
  },
  components: {},
  methods: {
    selectMusic(musicId, titleName) {
      document.title = "正在播放  " + titleName;
      this.$root.$children[0].currentMusicUrl = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
    },
  },
};
</script>

<style scpoed>
.today-recommended-text {
  position: sticky;
  top: 0.5px;
  background-color: white;
  white-space: nowrap;
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