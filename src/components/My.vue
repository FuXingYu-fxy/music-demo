<template>
  <div class="user-page-container">
    <!-- 给user-page-container一个弹性布局 -->
    <div class="user-info-areas">
      <div class="user-info">
        <!-- user-info也是flex -->
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
        <div class="music-placeholder">音乐占位</div>
        <div class="music-placeholder">音乐占位</div>
        <div class="music-placeholder">音乐占位</div>
        <div class="music-placeholder">音乐占位</div>
        <div class="music-placeholder">音乐占位</div>
      </div>
    </div>
    <div class="user-recommended-today">
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
export default {
  name: "",
  data() {
    return {
      userInfo,
      dailySongs,
    };
  },
  methods: {
    selectMusic(musicId, titleName) {
      document.title = titleName;
      this.$root.$children[0].currentMusicUrl = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
    },
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
  //  beforeRouteEnter (to, from, next) {
  //  }
  // TODO 后期在这里加上登陆验证
};
</script>
<style scpoed>
.user-page-container {
  border: 1px solid red;
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
}

/* 今日推荐部分 */
.today-recommended-text {
  position: sticky;
  top: 0.5px;
  background-color: white;
}
.user-recommended-today {
  margin-left: 8rem;
  max-height: 30rem;
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
