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
    <router-view name="default"></router-view>
    <router-view name="describe"></router-view>
    <router-view name="music-list"></router-view>
    <music-component :musicurl="currentMusicUrl"/>
  </div>
</template>

<script>
import MusicComponent from './components/MusicComponent.vue';
export default {
  name: "App",
  components: {
    MusicComponent
  },
  data() {
    return {
      currentMusicUrl: "#",
    }
  },
  computed: {
    // isNotAppHome() {
    //   // 首页不显示播放框
    //   return !this.$route.path === '/';
    // }
  }
};
</script>
<style>
#app {
  position: relative;
}
.nav-list {
  position: absolute;
  z-index: 999;
  list-style: none;
  margin: 0;
  right: 7rem;
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
