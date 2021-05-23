<template>
  <div id="app">
    <!-- <div class="nav-list-container"> -->
    <ul class="nav-list">
      <li><router-link :to="{ path: '/home' }" tag="a">首页</router-link></li>
      <li><router-link :to="{ path: '/my' }" tag="a">我的</router-link></li>
      <li><router-link :to="{ path: '/about' }" tag="a">关于</router-link></li>
      <li><router-link :to="{ path: '/more' }" tag="a">更多</router-link></li>
    </ul>
    <!-- </div> -->
    <!-- 渲染视图 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="default" :current-time="currentTime"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" name="default"></router-view>
    <router-view name="describe"></router-view>
    <router-view name="music-list"></router-view>
    <!-- 音乐播放条组件 -->
    <music-component
      :current-play-music-info='sharedData.currentPlayMusicInfo'
      :music-list-info="sharedData.musicListInfo"
      :music-list-info-flag-bit="sharedData.musicListInfoFlagBit"
      :current-play-music-info-flag-bit="sharedData.currentPlayMusicInfoFlagBit"
      @update-current-play-music-id="updateCurrentPlayMusicId"
      @timeupdate="currentTime=$event"
    />
  </div>
</template>

<script>
import MusicComponent from './components/MusicComponent.vue';
import store from './js/store'
export default {
  name: "App",
  components: {
    MusicComponent
  },

  data() {
    return {
      sharedData: store.state,
      currentTime: 0
    }

  },
  computed: {
    // isNotAppHome() {
    //   // 首页不显示播放框
    //   return !this.$route.path === '/';
    // }
  },
  methods: {
    updateCurrentPlayMusicId(value) {
      // console.log(value);
      store.setMessageAction("currentPlayMusicId", value);
    }
  },
};
</script>
<style>
#app {
  position: relative;
  height: 100vh;
}
.nav-list {
  position: absolute;
  z-index: 999;
  list-style: none;
  margin: 0;
  right: 10%;
}
.nav-list li {
  display: inline-block;
  padding: 0.5rem;
}
.nav-list li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
</style>
