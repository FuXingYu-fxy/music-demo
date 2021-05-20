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
      <hr />
      <recommend-music />
    </div>
  </div>
</template>

<script>
import Carousel from "./Carousel.vue";
import RecommendMusic from "./RecommendMusic.vue";
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
  height: 100%;
  min-height: 100%;
  /*background-color: hsl(0deg 0% 100% / 30%);*/
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(20px);
}
.search-container {
  border: 1px solid tomato;
  position: relative;
  right: 35%;
  top: 2%;
}

.carousel-container {
  margin: 2.5% 0;
  width: 60%;
  height: 25%;
}

.recommend-music-container {
  width: 90%;
  height: 50%;
}
</style>
