<template>
  <div class="home-page">
    <div class="search-container">
      <search
        :value="value"
        @input="requestSearchResult"
        @blur="delayHidden"
        @focus="isShow = searchResult.length !== 0"
      />
      <transition name="music-card">
        <div class="musicCard" v-show="isShow">
          <a
            class="item"
            v-for="(item, index) of searchResult"
            @click="playMusic(index)"
          >{{ item.musicName }}/{{ item.artists }}</a>
        </div>
      </transition>
    </div>

    <div class="carousel-container">
      <carousel/>
    </div>

    <div class="recommend-music-container">
      <p>推荐歌单</p>
      <hr/>
      <recommend-music/>
    </div>
  </div>
</template>

<script>
import utils from '../js/utils';
import searchData from '../js/searchData';
import Carousel from "./Carousel.vue";
import RecommendMusic from "./RecommendMusic.vue";
import Search from "./Search.vue";

export default {
  name: "",
  data() {
    return {
      value: "",
      searchResult: [],
      // 控制显示卡片
      isShow: false,
    };
  },
  computed: {},
  methods: {
    delayHidden() {
      // console.log("失去焦点");
      setTimeout(() => this.isShow = false, 200);
      // 失去焦点事件比点击事件先触发，所以添加一个200ms的延时，不然卡片那里点不到
    },
    playMusic(index) {
      // console.log("点击事件");
      this.isShow = false;
      console.log(this.searchResult[index].artists);
    },
    requestSearchResult(e) {
      console.log(`查询歌曲: ${e}`);
      utils.getSongInfoByKeywords([e])
        .then(res => {
          if(res.code !== 200) {
            console.log(`服务器返回状态码异常: ${res.code}`);
            return;
          }
          // 最多显示20条数据
          let value = res.result.songs.slice(0, 20);
          this.searchResult = value.map(item => ({id: item.id, musicName: item.name, artists: item.artists[0].name}));
          this.isShow = true;
        })

    }
  },
  components: {
    Carousel,
    Search,
    RecommendMusic,
  },
};
</script>

<style scoped>
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
  /*border: 1px solid tomato;*/
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

/*搜索栏歌曲卡片的样式*/
.musicCard {
  position: absolute;
  background-color: aliceblue;
  left: 5%;
  top: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  height: 190px;
  overflow: hidden auto;
  width: 75%;

}

.musicCard .item {
  font-size: 12px;
  display: block;
  padding: 2px 1.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transform: scale(.9);
  cursor: pointer;
}

.musicCard .item:hover {
  color: #79fccc;
}

.musicCard::-webkit-scrollbar {
  width: 0;
}

/*卡片过渡的样式*/
.music-card-enter,
.music-card-leave-to {
  opacity: 0;
  height: 0;
}

.music-card-enter-active,
.music-card-leave-active {
  transition: all .3s linear;
}

.music-card-enter-to,
.music-card-leave {
  /*height: 100%;*/
}
</style>
