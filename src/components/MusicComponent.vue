<template>
  <div class="music-component" v-show="isNotAppHome">

    <div class="music-controls">
      <a href="javascript:"
         class="btn-previous"
         title="[上一首]"
         @click="prev"></a>
      <!-- 如果是播放状态, 按钮显示的应该是暂停，否则显示播放 -->
      <a
        href="javascript:"
        :class="audio.paused ? 'btn-play' : 'btn-pause'"
        @click="changePlayerStatus"
        :title="audio.paused ? '[播放]' : '[暂停]'"
      ></a>
      <a href="javascript:"
         class="btn-next"
         title="[下一首]"
         @click="next"
      ></a>
      <!--      <div :class="['music-cover', audio.paused ? '': 'music-cover-animation']" >-->
      <div :class="['music-cover music-cover-animation', audio.paused ? '' : 'music-cover-play']">
        <img :src="musicCoverUrl" alt="专辑封面"/>
      </div>
      <div class="music-info-container">
        <span class="music-name">{{ songName }}</span>

        <span class="artist">{{ artist }}</span>

        <div class="duration">
          <span class="music-current-progress">{{ getCurrentTime_MM_SS }}</span>
          <span class="music-duration">{{ musicDuration }}</span>
        </div>

        <div class="music-progress-bar ">
          <!-- 总进度条 -->
          <div class="player-progress-inner">
            <!-- TODO 如果有需要可以在这里加一个指示加载成功的进度条 .player-progress-load -->
            <!-- 当前进度条 -->
            <!-- TODO 进度条拖动 -->
            <div class="player-progress-play" :style="currentMusicProgress">
              <!-- 进度条上的点 -->
              <i class="player-progress-dot"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 歌曲封面现在需要通过专辑内容接口获取 -->

      <a href="javascript:"
         :class="audio.loop ? 'btn-play-mode-single-loop' : 'btn-play-mode-list-loop'"
         :title="audio.loop ? '[单曲循环]': '[列表循环]'"
         @click="changePlayerMode"
      >
      </a>
      <a href="javascript:" class="btn-like-this" title="[喜欢]"></a>
      <a href="javascript:" class="btn-download" title="[下载]"></a>
      <a href="javascript:" class="btn-comment" title="[评论]"></a>
    </div>
  </div>
</template>

<script>
import utils from "../js/utils";
import musicList from '../js/data'

export default {
  name: "MusicComponent",
  props: {
    // currentPlayMusicInfo 是接口/song/detail?ids=1455767549 返回的单条歌曲详细信息
    currentPlayMusicInfo: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    musicListInfo: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    musicListInfoFlagBit: {
      type: Number,
      required: true,
      default: 0
    },
    currentPlayMusicInfoFlagBit: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      isLoop: false,
      audio: {},
      // playerStatus: "播放",
      songName: " ",
      artist: " ",
      currentTime: 0,
      musicDuration_MS: 0,
      musicDuration: "00:00",
      musicCoverUrl: "/static/imgs/defaultCover.jpg",
      // 当前音乐播放列表
      currentMusicList: null,
      // 当前音乐在歌单中的索引
      indexOfCurrentMusiclist: 0,
    };
  },
  computed: {
    // computed所依赖的数据发生改变时，computed会重新计算
    isNotAppHome() {
      // 首页不显示
      return !(this.$route.path === "/" || this.$route.path === "/login");
    },
    getCurrentTime_MM_SS() {
      return utils.formatDuration(this.currentTime * 1000);
    },
    currentMusicProgress() {
      let styleObj = null;
      if (this.musicDuration_MS === 0) {
        styleObj = {
          width: "0%;",
        };
      } else {
        styleObj = {
          width:
            ((this.currentTime / Math.floor(this.musicDuration_MS / 1000)) * 100)
              .toFixed(2) + "%",
        };
      }
      return styleObj;
    },
  },
  created() {
    let audio = document.createElement("audio");
    audio.autoplay = true;
    this.audio = audio;

    audio.addEventListener("timeupdate", () => {
      // 可以监测 currentTime的变化
      this.currentTime = audio.currentTime;
      this.$emit("timeupdate", this.currentTime);
    });

    audio.addEventListener('ended', e => {
      // 音乐播放结束后将会触发该事件
      if(!this.audio.loop) {
        this.next();
      }
    })
  },
  watch: {
    // 每次更改其他的歌曲这里都能监测到
    // musicListInfo 来源是：App作为pros传递给子组件
    musicListInfoFlagBit() {
      // FIXMED 监听一个对象开销很大,目的只是为了更新数据，设置一个标志位来代替这个对象, 标志位改变意味着musicListInfo对象改变
      this.updateMusicMessage(this.currentPlayMusicInfo, this.musicListInfo);
    },
    currentPlayMusicInfoFlagBit() {
      this.updateMusicMessage(this.currentPlayMusicInfo, {}, false);
    }
  },
  methods: {
    updateMusicMessage(currentPlayMusicInfo, musicListInfo = {}, flag = true) {
      // debugger;
      // 歌曲名
      this.songName = currentPlayMusicInfo.name;
      // 艺术家名 ar是个对象数组，先取出所有艺术家的名字，再用join用'/'连接起来
      this.artist = currentPlayMusicInfo.ar.map((item) => item.name).join("/");
      // 持续时间
      this.musicDuration_MS = currentPlayMusicInfo.dt;
      this.musicDuration = utils.formatDuration(currentPlayMusicInfo.dt);
      // 歌曲封面
      this.musicCoverUrl = currentPlayMusicInfo.al.picUrl;
      //
      this.audio.src = `https://music.163.com/song/media/outer/url?id=${currentPlayMusicInfo.id}.mp3`;

      // 更新播放列表
      if (flag) {

        // 设置索引
        this.indexOfCurrentMusiclist = currentPlayMusicInfo.indexOfCurrentMusiclist;

        // 设置当前播放的音乐列表
        // TODO musicList这里还有privileges字段，应该是对应版权信息，播放音质的字段
        this.currentMusicList = musicListInfo;

        // 播放列表长度
        this.musicListLength = musicListInfo.songs.length;
      }
    },
    setMusicSrc(index) {
      // 根据索引从当音乐列表中取出对应歌曲项
      let currentPlayMusicInfo = this.currentMusicList.songs[index];
      this.updateMusicMessage(currentPlayMusicInfo, {},  false);
    },
    // toggle按钮对应的方法
    changePlayerStatus() {
      // audio 内部有一个属性 audio.paused 可以观察播放状态
      // this.currentPlayerStatus = !this.currentPlayerStatus;
      if (this.audio.paused) {
        // 如果是当前是暂停状态，按钮的功能就应该是播放, 悬浮文字要改变为暂停, 与按钮的功能相反
        this.audio.play();  // 会改变this.audio.paused的属性
        // 变为播放状态后，鼠标悬停文字应该是暂停
        // this.playerStatus = "暂停";
      } else {
        this.audio.pause();
        // this.playerStatus = "播放";
      }
    },
    changePlayerMode() {
      this.audio.loop = !this.audio.loop;
    },
    // next按钮对应的方法
    next() {
      // 更新索引
      this.indexOfCurrentMusiclist = (this.indexOfCurrentMusiclist + 1) % this.musicListLength;

      this.setMusicSrc(this.indexOfCurrentMusiclist);

      // 更新当前播放音乐的id, 高亮功能会用到
      let musicId = this.currentMusicList.songs[this.indexOfCurrentMusiclist].id;
      this.$emit('update-current-play-music-id', musicId);
    },
    // 上一首对应的方法
    prev() {
      this.indexOfCurrentMusiclist--;
      this.indexOfCurrentMusiclist = this.indexOfCurrentMusiclist < 0 ? this.musicListLength - 1 : this.indexOfCurrentMusiclist;
      this.setMusicSrc(this.indexOfCurrentMusiclist);
      let musicId = this.currentMusicList.songs[this.indexOfCurrentMusiclist].id;
      this.$emit('update-current-play-music-id', musicId);
    }
  },
};
</script>

<style scoped>
.debugger-divtion {
  box-sizing: border-box;
  border: 1px solid greenyellow;
}

.music-component {
  width: 100vw;
  height: 4rem;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid greenyellow;
}

/* 音乐信息展示栏 */
.music-info-container {
  /* height: 100%; */
  /*position: absolute;*/
  /*top: -146%;*/
  /*left: 25%;*/
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*音乐名和作者居中*/
  align-items: center;

  /*background-color: #b0f4ff;*/
  border-radius: 4px;
  padding: 2px;
  box-sizing: border-box;
  width: 35.5%;
  min-height: 66.667px;
  /* 留出空位来给albumn */
  padding-left: 6%;
}

.music-cover {
  width: 75px;
  height: 75px;
  position: absolute;
  top: -23%;
  left: 28%;
  transition: 1s;
}

.music-cover-animation {
  animation: avatar-rotate 10s linear 1s infinite;
  animation-play-state: paused;
}

.music-cover-play {
  animation-play-state: running;
}

@keyframes avatar-rotate {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes avatar-translate {
  0% {
    transform: translateY(45%);
  }
}

.music-cover img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/*.music-cover-translate {*/
/*  transform: translateY(-45%);*/
/*}*/
/* ==============================进度条部分============================== */

/* 作者 */
.artist {
  color: #FF9800;
  font-size: 0.1rem;
}

/* 进度条两边的时间 */
.duration {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.1rem;
  color: #02acfd;
  margin-bottom: 3px;
  width: 100%;
}

/* 进度条的外层宽高 */
.music-progress-bar {
  width: 100%;
  height: 7px;
}

.player-progress-inner {
  width: 100%;
  height: 100%;
  background-color: white;
}

/* 当前进度条取决于player-progress-play的宽度 */
.player-progress-play {
  /* 在组件中通过计算 currentTime 和 duration得出进度条的百分比 */
  width: 0;
  height: 100%;
  background-color: blue;
}

.player-progress-dot {
  width: 10px;
  height: 10px;
  background-color: #fefefe;
  display: block;
  border-radius: 50%;
  position: relative;
  top: -50%;
  /* 小球的left设为97.5%, 始终贴合 当前进度条的边缘*/
  left: 97.5%;
}

/* 控制中心 */
.music-controls {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #79ad979e;
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

.btn-play-mode-list-loop {
  background-image: url("/static/imgs/loop.png");
}
.btn-play-mode-single-loop {
  background-image: url("/static/imgs/single.png");
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
