<template>
  <div class="today-music">
    <p class="today-recommended-text">{{ playlistTitle }}</p>

    <div v-show="isLoading" class="loading-box">
      <loading-animation
        :duration="1"
        color="purple"
      >
        <p style="font-size: 15px">加载中</p>
      </loading-animation>
    </div>

    <ul v-show="!isLoading">
      <li v-for="(music, index) of musicListInfo.songs" :key="music.id">
        <a
          :class="['music-name-link', music.id === currentPlayMusicId ? 'highlight' : '']"
          @click="selectMusic(music, index)"
        >
          {{ music.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import LoadingAnimation from './LoadingAnimation'
import utils from "../js/utils";
import Vue from 'vue';

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
        return [];
      },
    },
    currentPlayMusicId: {
      type: Number,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      musicListInfo: [],
    };
  },
  components: {
    LoadingAnimation
  },
  methods: {
    selectMusic(currentPlayMusicInfo, index) {
      // 为对象响应式添加index属性
      // index 播放模式(单曲循环、列表顺序)需要歌曲相对于歌单的index
      // debugger;
      Vue.set(currentPlayMusicInfo, 'indexOfCurrentMusiclist', index);
      console.log("______UserFavoriteMusic______");
      console.log(currentPlayMusicInfo);
      // Vue.set(musicInfo, 'musicListInfo', this.musicListInfo);
      // App.vue组件将musicInfo作为props传递给 MusicComponent.vue组件
      this.$emit('update-music-info', currentPlayMusicInfo, this.musicListInfo);
      // this.$root.$children[0].musicInfo = musicInfo;
      this.$emit('update-current-play-music-id', currentPlayMusicInfo.id);
    },
    getSongInfoBySongIds: utils.getSongInfoBySongIds,

  },
  watch: {
    favoriteSongIds(newValue) {
      this.getSongInfoBySongIds(newValue)
        .then(value => {
          this.musicListInfo = value;
          // console.log(value);
          this.$emit("change-loading-status", false);
        });
    },
    // 因为父组件的值不知道何时传过来，所以在这里监听dailySongIds
    dailySongIds(newValue) {
      this.getSongInfoBySongIds(newValue)
        .then(value => {
          this.musicListInfo = value;
          // console.log(value);
          this.$emit("change-loading-status", false);
        });
    },
  },
};
export default vm;
</script>

<style scoped>
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

.highlight {
  color: aquamarine;
}

/*加载动画的位置*/
.loading-box {
  display: flex;
  justify-content: center;
}
</style>
