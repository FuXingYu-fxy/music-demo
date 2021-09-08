<template>
  <div class="user-page-container">
    <!-- 给user-page-container一个横向弹性布局 -->
    <div class="user-info-areas">
      <div class="user-info">
        <!-- user-info内也是flex -->
        <!-- 用户头像 -->
        <div class="user-avatar-container">
          <a href="#"
             style="display:block"
          ><img
            class="user-avatar"
            :src="userInfo.profile.avatarUrl"
            alt="用户头像"
          /></a>
        </div>
        <!-- 用户昵称 -->
        <p class="nickname">{{ userInfo.profile.nickname }}</p>
      </div>
      <!-- 用户最喜爱的音乐列表 -->
      <div class="user-favorite">
        <div
          class="playlist"
          v-for="playList of userPlaylist.playlist"
          :key="playList.id"
        >
          <a class="playlist-link"
             @click="goToDetailsPlaylist(playList.id, playList.name)"
          ><img
            class="cover-img"
            :src="playList.coverImgUrl"
            alt="用户歌单图片"
          />
            <p class="playlist-title">{{ playList.name }}</p>
          </a>
        </div>
      </div>
    </div>

    <div class="user-recommended-today">
      <user-favorite-music
        :daily-song-ids='dailySongIds'
        :favorite-song-ids='sharedData.favoriteSongIds'
        :playlist-title='playlistTitle'
        @update-music-info="updateMusicInfo"
        :current-play-music-id="getCurrentPlayMusicId"
        @update-current-play-music-id="updateCurrentPlayMusicId"
        :is-loading="loading"
        @change-loading-status="loading=$event"
      >
      </user-favorite-music>
    </div>

    <!--    歌词部分-->
      <div class="lyrics-container">
        <div class="lyrics-section" :style="translate">
          <span>
            {{sharedData.currentPlayMusicInfo.name}}
          </span>
          <span v-for="i of 4">
            ...
          </span>
        <span
          class="lyrics"
          :class="['lyrics-'+index, {highlight: index===lyricIndex}]"
          v-for="(item, index) of resolvedLyrics"
          :key="index"
          :data-index="index"
        >
          {{ item.lyric }}</span>
        </div>
      </div>
    <!--    <button @click="getLoginStatus">获取登录状态</button>-->
    <!--    <button @click="login">登录</button>-->
  </div>
</template>

<script>
import {dailySongs, userInfo} from "../js/daily.js";
import global from "../js/global.js";
import UserFavoriteMusic from './UserFavoriteMusic'
import store from '../js/store'
import utils from '../js/utils'

const vm = {
  // inheritAttrs: false,
  props: {
    currentTime: {
      type: Number,
      required: true,
    }
  },
  name: "",
  data() {
    return {
      userInfo,
      userPlaylist: {},
      // TODO 更换为网络请求
      dailySongIds: [], // '今日推荐' 歌曲id
      playlistTitle: '今日推荐',
      // favoriteSongIds: store.state // 用户喜爱歌单的歌曲id
      sharedData: store.state,
      // 歌曲列表加载状态
      loading: false,
      // 未分词前的歌词，包含时间
      lyrics: "",
      // 歌词时间数组
      resolvedLyrics: [],
      // 全局索引
      idx: 0,
      // 判断高亮歌词的索引
      lyricIndex: 0,
      scrollHeight: 0,
      height:0
    };
  },
  methods: {
    // ****************************测试登录状态********************************************
    // login
    // login() {
    //   let url = `http://localhost:3000/login?email=xy1253076882@163.com&password=fuxingyuniubi.`;
    //   fetch(url, {
    //     method: "GET",
    //     credentials: "include"
    //   }).then(response => response.json())
    //     .then(console.log);
    //
    // },
    // // 获取登录状态
    // getLoginStatus() {
    //   let url = `http://localhost:3000/login/status`;
    //   fetch(url, {
    //     method: "GET",
    //     credentials: "include"
    //   }).then(response => response.json())
    //     .then(value => console.log(value));
    // },

    //**************************************************************
    // playlistId 歌单id是通过读取用户播放列表得到的
    goToDetailsPlaylist(playlistId, playlistTitle) {
      // 获取歌单详情
      this.playlistTitle = playlistTitle;
      this.loading = true;
      let url = `${global.server}/playlist/detail?id=${playlistId}`;
      fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          // result 是 playlist json数据， 只有 result.playlist.trackIds才是完整的歌曲数据
          let trackIds = result.playlist.trackIds.map(item => item.id);
          // ******
          store.setMessageAction('favoriteSongIds', trackIds);
          // this.$nextTick(() => console.log(this.favoriteSongIds));
          // BUG 如果是同一个playlistId 会报错
          // *** 取消路由 ***
          // this.$router.push(`/my/${playlistId}`, null, failure => {console.log(failure)});
          // this.$nextTick(() => this.loading = false);

          // 不能加在这里，因为UserFavoriteMusic组件里还有请求，应该加在那里面
          // this.loading = false;
        })
        .catch(reason => {
          alert('用户状态异常');
        })
    },
    updateMusicInfo(currentPlayMusicInfo, musicListInfo) {
      store.setMessageAction('currentPlayMusicInfo', currentPlayMusicInfo)
      store.setMessageAction('musicListInfo', musicListInfo);
      let flagBit = this.sharedData.musicListInfoFlagBit;
      flagBit = (flagBit + 1) % 10;
      store.setMessageAction('musicListInfoFlagBit', flagBit);
    },
    getCurrentPlayMusicLyrics(songId) {
      // 通过这个id获取歌词
      utils.getSongLyricsBySongId(songId)
        .then(data => {
          if (data.code === 200) {
            // console.log(data);
            // 此时的歌词还未分组
            // BUG 如果是纯音乐没有歌词
            this.lyrics = data.lrc.lyric;
            this.resolveLyricsData(this.lyrics);
          }
        })
    },
    updateCurrentPlayMusicId(songId) {
      // 歌曲高亮功能
      store.setMessageAction("currentPlayMusicId", songId);
    },
    handlerLyric(time) {
      if(this.idx > this.resolvedLyrics.length) return;

      if(this.height === 0) {
        this.height = document.querySelector(`span[data-index='${this.idx}']`).offsetHeight;
      }
      if(time >= this.resolvedLyrics[this.idx].time) {
        // 当 currentTime 大于 歌词的时间时, 获取当前歌词绑定的data-index属性
        // document.querySelector(`span[data-index=${this.idx}]`);
        this.scrollHeight += this.height;
        // document.querySelector(".lyrics-section").style.cssText = `transform: translateY(-${this.scrollHeight}px)`;
        this.lyricIndex = this.idx++;
      }
    },
    // 在请求歌词的回调函数里调用
    resolveLyricsData(lyrics) {
      // 时间数组
      let times = lyrics.match(/\d{2}:\d{2}\.\d{2}/g);
      times = times
        .map(timestamp => timestamp.split(":").map(item => parseFloat(item)))
        .map(([minute, seconde]) => minute * 60 + seconde);
      // 分词后的歌词数组
      let participleLyrics = lyrics.split(/\s*\n*\[.*?\]\s*/).filter((v) => !!v);

      let resolvedLyrics = [];
      for(let i = 0; i < times.length; i++) {
        // 修改
        resolvedLyrics.push({time: times[i], lyric: participleLyrics[i]});
      }
      this.resolvedLyrics = resolvedLyrics;
    },
  },
  computed: {
    getCurrentPlayMusicId() {
      // console.log(this.sharedData.currentPlayMusicId);
      return this.sharedData.currentPlayMusicId;
    },
    translate() {
      return {
        transform: `translateY(-${this.scrollHeight}px)`
      }
    }
  },
  watch: {
    getCurrentPlayMusicId(songId) {
      console.log("获取新歌词");
      // 获取新歌词的时候重置这些属性
      this.idx = 0;
      this.lyricIndex = 0;
      this.scrollHeight = 0;
      this.getCurrentPlayMusicLyrics(songId);
    },
    currentTime(time) {
      this.handlerLyric(time);
    }
  },
  components: {
    UserFavoriteMusic
  },
  beforeRouteEnter(to, from, next) {
    // 请求用户播放列表数据
    fetch("http://localhost:3000/user/playlist?uid=245947021", {
      method: "GET",
      headers: {
        Origin: "http://localhost:8080",
      },
      credentials: "include",
    })
      .then((response) => {
        // xxx.json()返回的是一个 Promise
        return response.json();
      })
      .then((result) => {
        next((vm) => {
          vm.userPlaylist = result;
          // TODO 今日推荐和用户收藏歌单是分开的。后期这里再请求一个今日推荐歌曲 /recommend/songs 替换掉dailySongs
          let dailySongIds = dailySongs.data.dailySongs.map(item => item.id);
          // debugger;
          vm.dailySongIds = dailySongIds;
          console.log("请求用户数据成功");
        });
      })
      .catch((reason) => {
        alert("登陆状态异常!");
      });
  },
  // TODO 后期在这里加上登陆验证,
};

export default vm;
</script>

<style scoped>
.user-page-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: #ffffff38;
  backdrop-filter: blur(20px);

  /* 设置主屏幕高度 */
  height: 100vh;
  overflow: auto;

  padding-top: 3%;
  box-sizing: border-box;
}


.user-page-container > div {
  /*max-height: 75%;*/
  height: 75%;
  overflow: auto;
}

.user-page-container > div::-webkit-scrollbar {
  display: none;
}

/* 用户头像区域 */
.user-info-areas {
  display: flex;
  flex-direction: column;
  width: 25%;
  position: inherit;
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: cadetblue;
}

.nickname {
  margin-left: 1%;
}

.user-avatar-container {
  width: 20%;
}

.user-avatar {
  width: 100%;
  border-radius: 50%;
}

/* =======================喜欢的歌单================================= */
.user-favorite {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(3, 32%);
  gap: 2%;
}

/* ===================歌单封面=================== */
.playlist {
  /* width: 5%; */
}

.playlist-link {
  display: block;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.playlist-title {
  /* 歌单的描述性文字 */
  position: absolute;
  top: 0;
  text-decoration: none;
  margin: 0;
  text-align: center;
  width: 100%;
  color: white;

  height: 100%;
  color: white;
  overflow: hidden;
  transition: .6s;
  background-color: #4a4a4a78;
  font-size: .5rem;
}

.playlist-link:hover > .playlist-title {
  height: 0;
}

.cover-img {
  width: 100%;
  height: 100%;
}

/* =======================推荐歌曲的最外层div======================= */
.user-recommended-today {
  width: 25%;
}

.today-music {
  width: 100%;
  /* 今日推荐会根据这个来定位 */
  position: relative;
}

.today-recommended-text {
  margin: 0;
  position: sticky;
  top: 0;
  color: white;
}

.user-info-areas {
  box-sizing: border-box;
}

.user-recommended-today {
  box-sizing: border-box;
}

.lyrics-container {
  /*box-sizing: border-box;*/
}

/* =====================调试的边框====================== */

.lyrics-section {
  /*text-align: center;*/
  width: 375px;
  display: flex;
  flex-direction: column;
  transition: .2s;
  justify-content: center;
  align-items: center;
}

.lyrics {
  margin: 10px 0;
}

/*==================歌词高亮==================*/
.highlight {
  color: chartreuse;
  transform: scale(1.2);
}
</style>
