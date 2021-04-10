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
          v-for="music of userPlaylist.playlist"
          :key="music.id"
        >
          <a class="playlist-link"
             @click="goToDetailsPlaylist(music.id)"
            ><img
              class="cover-img"
              :src="music.coverImgUrl"
              alt="用户歌单图片"
            />
            <p class="playlist-title">{{ music.name }}</p>
          </a>
        </div>
      </div>
    </div>

    <div class="user-recommended-today">

      <router-view
        :favorite-song-ids='favoriteSongIds'
        :playlist-title='playlistTitle'
        :daily-song-ids='dailySongIds'
      >
      </router-view>
    </div>

    <div class="lyrics-container">
      <div>
        <ul class="lyrics-section">
          <li v-for="(line, index) of showLyrics" :key="index">
            {{ line }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo, dailySongs } from "../js/daily.js";
import global from "../js/global.js";
const vm = {
  name: "",
  data() {
    return {
      userInfo,
      userPlaylist: [],
      // TODO 更换为网络请求
      dailySongIds:[], // 今日推荐的歌曲
      playlistTitle: '今日推荐',
      favoriteSongIds: [], // 用户喜爱歌单的歌曲id
    };
  },
  methods: {
    goToDetailsPlaylist(playlistId) {
      // 获取歌单详情
      let url = `${global.server}/playlist/detail?id=${playlistId}`;
      fetch(url, {
        method: 'GET',
        headers: {
          Origin: 'http://localhost:8080',
        },
        credentials: 'include'
      })
      .then(response => {
        return response.json();
      })
      .then(result => {
        // result 是 playlist json数据， 只有 result.playlist.trackIds才是完成的歌曲数据
        this.playlistTitle = result.playlist.name;
        let trackIds = result.playlist.trackIds.map(item => item.id);
        this.favoriteSongIds = trackIds; // 把歌曲id发给组件，让组件自己去请求
        this.$router.push(`/my/${playlistId}`);
      })
      .catch(reason => {
        alert('用户状态异常');
      })
    }
  },
  computed: {
    showLyrics() {
      // TODO 正则表达式提取歌词
      // TODO 后期更改为网络请求歌词
      let Lyrics =
        "[00:11.87]Tell me that you need me now [00:16.54]'Cause in my dreams you're still around [00:21.69]You've been gone for quite some time [00:26.75]It finally feels like you're not mine [00:32.00]Will you remember me [00:34.85]'Cause I'll remember you [00:36.98]Yeah you [00:38.42]You went out and found somebody new [00:41.61]And that still hurts [00:44.08]It's taken everything inside my bones [00:47.42]To say these words [00:50.02]Even if it's not with me [00:53.45]I just want you to be happy [00:56.93]Woo woo [00:58.61]Just want you to be happy [01:01.96]Woo woo [01:05.32]I was torn and I was numb [01:10.02]I needed you but you needed anyone [01:15.27]I was bad but now I'm well [01:20.12]I had to lose you to find myself [01:25.47]Will you remember me [01:28.35]'Cause I'll remember you [01:30.38]Yeah you [01:31.89]You went out and found somebody new [01:35.09]And that still hurts [01:37.58]It's taken everything inside my bones [01:40.88]To say these words [01:43.50]Even if it's not with me [01:46.93]I just want you to be happy [01:49.08]Be happy [02:00.31]Woo woo woo woo woo woo woo [02:05.22]Woo woo woo woo woo woo woo [02:10.18]Nine months since I last saw you [02:12.98]And three months since we last spoke [02:15.73]Say happy birthday to you [02:18.55]Then I let you go [02:32.04]Tell me that you need me now [02:36.76]'Cause in my dreams you're still around [02:39.60]Around around around around around around around around ";
      // Array
      let splitedLyrics = Lyrics.split(/\s*\n*\[.*?\]\s*/).filter((v) => !!v);
      return splitedLyrics;
    },
  },
  components: {},
  beforeRouteEnter(to, from, next) {
    // 请求用户数据
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
          // TODO 后期这里再请求一个今日推荐歌曲 /recommend/songs 替换掉dailySongs
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

<style scpoed>
.user-page-container  {
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
  max-height: 85%;
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

/* =====================调试的边框====================== */
.user-info-areas {
  box-sizing: border-box;
  border: 1px solid red;
}
.user-recommended-today {
  box-sizing: border-boxr;
  border: 1px solid gold;
}

.lyrics-container {
  border: 1px solid greenyellow;
  box-sizing: border-box;
}
/* =====================调试的边框====================== */

.lyrics-section {
  text-align: center;
  padding: 0;
}
.lyrics-section li{
  list-style: none;
}

</style>
