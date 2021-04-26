<template>
  <div class="container">
    <div class="category-music-list-container">
      <table id="table">
        <tr>
          <th v-for="item of title" :key="item.id">{{ item.text }}</th>
        </tr>
        <!-- ================================================================ -->
        <!-- {{musicList.songs[0].ar[0].name}} -->
        <tr v-for="(song, index) of musicList.songs" :key="song.id">
          <!-- TODO 用nth:child(odd)给表格间隔换色 -->
          <td>{{ index + 1 }}</td>
          <td>no operating</td>
          <!-- TODO 给音乐加上别名, 对应字段 song.alai -->
          <td>
            <a class="music-name" @click="selectMusic(song)">{{
              song.name
            }}</a>
          </td>
          <!-- TODO 后期计划加上查看歌手信息、专辑信息等功能 -->
          <td>{{ song.ar[0].name }}</td>
          <td>{{ song.al.name }}</td>
          <td>{{ formatDuration(song.dt) }}</td>
          <td>{{ formatDate(song.publishTime) }}</td>
        </tr>
        <!-- musicList.songs[0].name 是歌曲名 -->
        <!-- musicList.songs[0].ar[0].name 是作者名 -->
        <!-- musicList.songs[0].al.name 是专辑名 -->
        <!-- musicList.songs[0].dt 是时长 毫秒 -->
        <!-- musicList.songs[0].publishTime 是发行时间 -->
      </table>
    </div>
    <!-- <keep-alive> -->
    <!-- <music-component :musicurl="currentMusicUrl" /> -->
    <!-- // 转移到主路由 -->
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import musicList from "../js/data";
import utils from '../js/utils';
// import MusicComponent from "./MusicComponent";
const vm = {
  name: "",
  data() {
    return {
      title: [
        { id: 0, text: "" },
        { id: 1, text: "操作" },
        { id: 2, text: "音乐标题" },
        { id: 3, text: "歌手" },
        { id: 4, text: "专辑" },
        { id: 5, text: "时长" },
        { id: 6, text: "发行时间" },
      ],
      musicList,
      currentMusicUrl: "#",
    };
  },
  components: {
    // MusicComponent,
  },
  // mounted() {
  //   console.log(this.$route.query);
  // }
  beforeRouteEnter(to, from, next) {
    let id = to.query.playlistId;
    // FIXME 后期更改为网络请求
    // vm是组件实例， 因为无法获取this, 通过回调执行
    next((vm) => {
      // 给data赋值
      // console.log(vm.musicList);
      console.log("object");
    });
  },
  methods: {
    
    selectMusic(musicInfo) {
      this.$root.$children[0].musicInfo = musicInfo;
    },
    formatDate(timestamp) {
      return new Date(timestamp).toISOString().slice(0, 10);
    },
    formatDuration: utils.formatDuration,
  },
};
export default vm;
</script> 

<style scpoed>
.container {
  width: 100vw;
  height: 100%;
  background: rgba(255, 255, 255, 0.226);
  backdrop-filter: blur(20px);
}
p {
  margin: 0 0 0.625rem 0;
}
.category-music-list-container {
  position: relative;
  top: 12%;
  display: flex;
  justify-content: left;
  max-height: 78%;
  overflow: auto;
}

#table {
  text-align: center;
  width: 100%;
}
td,th {
  min-width: 100px;
}

#table td {
  /* TODO  添加td的max-width 超过长度后文本截断*/
  color: white;
}
a.music-name {
  text-decoration: none;
  cursor: pointer;
}
a.music-name:hover {
  color: #79fccc;
}
</style>