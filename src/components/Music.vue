<template>
  <div>
    <div class="category-music-list-container">
      <table id="table" border="1">
        <tr>
          <th v-for="item of title" :key="item.id">{{ item.text }}</th>
        </tr>
        <!-- ================================================================ -->
        <!-- {{musicList.songs[0].ar[0].name}} -->
        <tr v-for="(song, index) of musicList.songs" :key="song.id">
          <td>{{ index + 1 }}</td>
          <td>no operating</td>
          <!-- TODO 给音乐加上别名, 对应字段 song.alai -->
          <td>
            <a class="music-name" @click="selectMusic(song.id, song.name)">{{
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
      <music-component :musicurl="currentMusicUrl" />
      <!-- // 转移到主路由 -->
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import musicList from "../js/data";
import MusicComponent from "./MusicComponent";
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
    MusicComponent,
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
    selectMusic(musicId, titleName) {
      this.currentMusicUrl = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
      document.title = titleName;
    },
    formatDate(timestamp) {
      return new Date(timestamp).toISOString().slice(0, 10);
    },
    formatDuration(dt) {
      let second = Math.floor(dt / 1000);
      let minute = Math.floor(second / 60);
      second = second % 60;
      minute = minute > 9 ? minute : "0" + minute;
      second = second > 9 ? second : "0" + second;
      return `${minute}:${second}`;
    },
  },
};
export default vm;
</script> 

<style scpoed>
p {
  margin: 0 0 0.625rem 0;
}
.category-music-list-container {
  position: relative;
  top: 5rem;
  display: flex;
  justify-content: center;
  max-height: 28rem;
  overflow-x: hidden;
}
.category-music-list-container::before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: #ffffff38;
  backdrop-filter: blur(5px);
}
.category-music-list-container table {
  text-align: center;
  max-width: 100vw;
}

#table td {
  /* TODO  添加td的max-width 超过长度后文本截断*/
  color: white;
}
.music-name {
  text-decoration: none;
  cursor: pointer;
}
.music-name:hover {
  color: #79fccc;
}

</style>