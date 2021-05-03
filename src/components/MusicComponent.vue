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
        :title="audio.paused ? '播放' : '暂停'"
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

        <div class="music-progress-bar debugger-divtion">
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
         class="btn-play-mode"
         title="[列表循环]"></a>
      <a href="javascript:" class="btn-like-this" title="[喜欢]"></a>
      <a href="javascript:" class="btn-download" title="[下载]"></a>
      <a href="javascript:" class="btn-comment" title="[评论]"></a>
    </div>
  </div>
</template>

<script>
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
    musicInfoFlagBit: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      isLoop: true,
      audio: {},
      playerStatus: "播放",
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
      // 首页不显示, 一定要加括号！！！！
      return !(this.$route.path === "/");
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
            (
              (this.currentTime / Math.floor(this.musicDuration_MS / 1000)) *
              100
            ).toFixed(2) + "%",
        };
      }
      return styleObj;
    },
  },
  created() {
    let audio = document.createElement("audio");
    audio.autoplay = true;
    this.audio = audio;

    // FIXME 能不能不监听事件，改成数据驱动？
    audio.addEventListener("timeupdate", () => {
      // 可以监测 currentTime的变化
      this.currentTime = audio.currentTime;
    });

    audio.addEventListener('ended', e => {
      // 音乐播放结束后将会触发该事件

    })
  },
  watch: {
    // FIXME 监听一个对象貌似开销挺大？ 目的只是为了更新数据，能不能设置一个标志位来代替这个对象？标志位改变意味着对象改变
    // 每次更改其他的歌曲这里都能监测到
    // musicInfo来源是：App作为pros传递给子组件
    musicInfoFlagBit() {
      debugger;
      this.updateMusicMessage(this.musicInfo);
    },
    // musicInfo(newMusicInfo) {
    //   this.updateMusicMessage(newMusicInfo);
    // },
    // 监听播放列表的变化
    currentMusicList(value) {
      // console.log(value);
    }
    // $route(value) {
    //   debugger;
    //   console.log(value.matched[1].instances.default.musicList);
    //   try {
    //     this.currentMusicList = value.matched[1].instances.default.musicList;
    //   } catch(e) {
    //     console.log("歌单获取错误 musciComponent.vue row: 134");
    //   }
    // }
  },
  methods: {
    updateMusicMessage(musicInfo, flag = true) {
      debugger;
      // 歌曲名
      this.songName = musicInfo.name;
      // 艺术家名 ar是个对象数组，先取出所有艺术家的名字，再用join用'/'连接起来
      this.artist = musicInfo.ar.map((item) => item.name).join("/");
      // 持续时间
      this.musicDuration_MS = musicInfo.dt;
      this.musicDuration = utils.formatDuration(musicInfo.dt);
      // 歌曲封面
      this.musicCoverUrl = musicInfo.al.picUrl;
      //
      this.audio.src = `https://music.163.com/song/media/outer/url?id=${musicInfo.id}.mp3`;

      if (flag) {

        // 设置索引
        this.indexOfCurrentMusiclist = musicInfo.indexOfCurrentMusiclist;

        // 设置当前播放的音乐列表
        // TODO musicList这里还有privileges字段，应该是对应版权信息，播放音质的字段
        this.currentMusicList = musicInfo.musicList;

        // 播放列表长度
        this.musicListLength = musicInfo.musicList.songs.length;
      }
    },
    setMusicSrc(index) {
      let musicInfo = this.currentMusicList.songs[index];
      this.updateMusicMessage(musicInfo, false);
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
    // next按钮对应的方法
    next() {
      this.indexOfCurrentMusiclist = (this.indexOfCurrentMusiclist + 1) % this.musicListLength;
      this.setMusicSrc(this.indexOfCurrentMusiclist);
    },
    // 上一首对应的方法
    prev() {
      this.indexOfCurrentMusiclist--;
      this.indexOfCurrentMusiclist = this.indexOfCurrentMusiclist < 0 ? this.musicListLength - 1 : this.indexOfCurrentMusiclist;
      this.setMusicSrc(this.indexOfCurrentMusiclist);
    }
  },
};
</script>

<style scpoed>
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
  left: 29%;
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
