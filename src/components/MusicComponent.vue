<template>
 <div class="music-component">
   <audio :src="musicurl" controls autoplay="true" :loop="isLoop"></audio>
 </div>
</template>

<script>
 export default {
   name:'MusicComponent',
   props: {
     musicurl: {
       type: String,
       required: true,
       default: "#"
     },
   },
   data () {
     return {
       isLoop: true
     }
   },
   components: {

   }
 }
</script>

<style scpoed>
  .music-component {
    width: 100vw;
    height: 1.5rem;
    position: fixed;
    bottom: 0;
  }
  .music-component audio {
    width: inherit;
    height: inherit;
  }
 
</style>