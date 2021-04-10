<template>
  <div class="music-component" v-show="isNotAppHome">
    <div class="music-info-container">
      <span class="music-name">{{ songName }}</span>

      <span class="artist">{{ artist }}</span>

      <div class="duration">
        <!-- <span class="music-current-progress">{{ musicCurrentProgress }}</span> -->
        <span class="music-current-progress"> 00:00 </span>
        <!-- <span class="music-duration">{{ musicDuration }}</span> -->
        <span class="music-duration">03:22</span>
      </div>

      <div class="music-progress-bar">
        <div class="player-progress-inner">
          <!-- TODO 如果有需要可以在这里加一个指示加载成功的进度条 -->
          <div class="player-progress-play">
            <i class="play-progress-dot"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌曲封面现在需要通过专辑内容接口获取 -->
    <div class="music-cover">
      <img :src="musicCoverUrl" alt="专辑封面" />
    </div>

    <div class="music-controls">
      <a href="javascript:;" class="btn-previous" title="[上一首]"></a>
      <a
        href="javascript:;"
        :class="isPlay ? 'btn-play' : 'btn-pause'"
        title="[播放]"
      ></a>
      <a href="javascript:;" class="btn-next" title="[下一首]"></a>
      <a href="javascript:;" class="btn-play-mode" title="[列表循环]"></a>
      <a href="javascript:;" class="btn-like-this" title="[喜欢]"></a>
      <a href="javascript:;" class="btn-download" title="[下载]"></a>
      <a href="javascript:;" class="btn-comment" title="[评论]"></a>
    </div>
  </div>
</template>

<script>
import global from "../js/global";
import utils from "../js/utils";
export default {
  name: "MusicComponent",
  props: {
    // musicInfo 是接口/song/detail?ids=1455767549 返回的单条歌曲详细信息
    musicInfo: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isLoop: true,
      audio: null,
      isPlay: false,
      songName: "",
      artist: "",
      musicDuration: "",
      musicCoverUrl: "",
    };
  },
  computed: {
    isNotAppHome() {
      // 首页不显示, 一定要加括号！！！！ 优先级原因
      return !(this.$route.path === "/");
    },
  },
  components: {},
  mounted() {
    let audio = document.createElement("audio");
    audio.autoplay = true;
    this.audio = audio;
  },
  watch: {
    // FIXME 监听一个对象貌似开销挺大？ 目的只是为了更新数据，能不能设置一个标志位来代替这个对象？标志位改变意味着对象改变
    // 每次更改其他的歌曲这里都能监测到
    musicInfo(newMusicInfo) {
      this.updateMusicMessage(newMusicInfo);
    },
  },
  methods: {
    updateMusicMessage(musicInfo) {
      // 歌曲名
      this.songName = musicInfo.name;
      // 艺术家名 ar是个对象数组，先取出所有艺术家的名字，再用join用'/'连接起来
      this.artist = musicInfo.ar.map((item) => item.name).join("/");
      // 持续时间
      this.musicDuration = utils.formatDuration(musicInfo.dt);
      // 歌曲封面
      this.musicCoverUrl = musicInfo.al.picUrl;
    },
  },
};
</script>

<style scpoed>
.music-component {
  width: 100vw;
  height: 3rem;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid greenyellow;
}
/* 音乐信息展示栏 */
.music-info-container {
  height: 100%;
  position: absolute;
  top: -100%;
  left: 32%;
}
.music-cover {
    width: 6%;
    position: absolute;
    top: -66%;
    left: 25%;
}
.music-cover img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* 控制中心 */
.music-controls {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}
/* 按钮的通用样式 */
.music-controls a {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background-size: 100% 100%;
  margin: 0 2%;
}
.btn-previous {
  background-image: url("/static/imgs/prev.png");
}
.btn-play {
  background-image: url("/static/imgs/play.png");
}
.btn-pause {
  background-image: url("/static/imgs/pause.png");
}
.btn-next {
  background-image: url("/static/imgs/next.png");
}
.btn-play-mode {
  background-image: url("/static/imgs/loop.png");
}
.btn-like-this {
  background-image: url("/static/imgs/unlike.png");
}
.btn-download {
  background-image: url("/static/imgs/random.png");
}
.btn-comment {
  background-image: url("/static/imgs/single.png");
}
</style>