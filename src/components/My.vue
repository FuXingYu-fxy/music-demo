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
            <td>{{music.name}}</td>
          </tr>
        </table>
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
  top: .5px;
  background-color: white;
}
.user-recommended-today {
  margin-left: 8rem;
  max-height: 30rem;
  overflow-x: hidden;
  background-color: #ffffff33;
  backdrop-filter: blur(8px);
}
</style>
