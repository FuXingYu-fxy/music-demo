<template>
  <div class="home-page">
    <div class="search-container">
      <search />
    </div>

    <div class="carousel-container">
      <carousel />
    </div>

    <div class="recommend-music-container">
      <p>推荐歌单</p>
      <hr>
      <recommend-music/>
    </div>
  </div>
</template>

<script>
import Carousel from "./Carousel.vue";
import RecommendMusic from './RecommendMusic.vue';
import Search from "./Search.vue";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    Carousel,
    Search,
    RecommendMusic,
  },
};
</script>

<style scpoed>
.home-page {
  width: 100%;
  min-height: 100vh;
  background-color: hsl(0deg 0% 100% / 30%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-page::before {
  content: "";
  position: absolute;
  transition: 0.5s;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(20px);
  z-index: -1;
}

.search-container {
  border: 1px solid tomato;
  position: relative;
  right: -12rem;
  top: 0.6rem;
}

.carousel-container {
  margin: 2rem 0;
}
</style>
