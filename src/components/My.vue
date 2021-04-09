<template>
  <div class="user-page-container">
    <!-- 给user-page-container一个弹性布局 -->
    <div class="user-info-areas">
      <div class="user-info">
        <!-- user-info内也是flex -->
        <!-- 用户头像 -->
        <div class="user-avatar-container">
          <a href="#"
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
.user-page-container {
  /* border: 1px solid red; */
  position: relative;
  top: 4rem;
  display: flex;
  flex-direction: row;
}
.user-info-areas {
  display: flex;
  flex-direction: column;
}
.music-placeholder {
  width: 4rem;
  height: 4rem;
  border: 1px solid red;
  box-sizing: border-box;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-info .nickname {
  margin: 0 0 0 0.5rem;
}
.user-avatar-container {
  width: 5rem;
  height: 5rem;
}
.user-avatar {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}
.user-favorite {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 7rem);
  grid-template-rows: auto;
  gap: 2.5rem 0;
  justify-items: center;
  max-height: 21.875rem;
  background-color: rgba(255, 255, 255, 0.151);
  backdrop-filter: blur(2px);
  overflow: hidden auto;
}
/* 用户歌单 */
.playlist {
  width: 5rem;
  height: 5rem;
  position: relative;
  z-index: 2;
  cursor: pointer;
}
.playlist-link {
  display: block;
  height: inherit;
  width: inherit;

}
.playlist-link:hover > .playlist-title {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.459);
}
.cover-img {
  width: 100%;
  height: 100%;
}
.playlist-title {
  position: absolute;
  top: 0;
  margin: 0;
  text-align: center;
  width: inherit;
  height: inherit;
  overflow: hidden;
  color: white;
  opacity: 0;
  transition: 0.45s ease-in;
  font-size: 0.8rem;
}

/* 今日推荐部分 */
/* .today-recommended-text {
  position: sticky;
  top: 0.5px;
  background-color: white;
} */
.user-recommended-today {
  margin-left: 8rem;
  height: 30rem;
  overflow-x: hidden;
  background-color: #ffffff33;
  backdrop-filter: blur(8px);
}
.user-recommended-today::-webkit-scrollbar {
  /* 隐藏滚动条但是页面还能滚动 */
  display: none;
}

.music-name-link {
  cursor: pointer;
}

.music-name-link:hover {
  color: aquamarine;
}
/* 歌词部分 */
.lyrics-section {
  text-align: center;
  max-height: 28rem;
  overflow: auto;
  background-color: #ffffff33;
  backdrop-filter: blur(8px);
  margin: 2rem 2rem 0 2rem;
}
.lyrics-section::-webkit-scrollbar {
  /* 隐藏滚动条但是页面还能滚动 */
  display: none;
}
.lyrics-section li {
  list-style: none;
}
</style>
