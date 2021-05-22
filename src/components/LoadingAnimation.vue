<template>
  <div class="atom-spinner" :style="resize">
    <div class="spinner-inner">
      <div class="spinner-line"></div>
      <div class="spinner-line"></div>
      <div class="spinner-line"></div>
      <div class="spinner-circle">
        <slot>&#9679;</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingAnimation",
  props: {
    duration: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: "100px"
    },
    color: {
      type: String,
      default: "#ff1d5e"
    }
  },
  computed: {
    resize() {
      return {
        '--size': this.size,
        '--duration': this.duration + 's',
        '--color': this.color
      }
    }
  }
}
</script>

<style scoped>

.atom-spinner, .atom-spinner * {
  box-sizing: border-box;
}


.atom-spinner {
  --size: 100px;
  --color: #ff1d5e;
  --duration: 1s;

  height: var(--size);
  width: var(--size);
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: var(--color);
  font-size: calc(var(--size) * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  /* border: calc(60px / 25) solid #ff1d5e; */
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: var(--duration);
  border-left: calc(var(--size) / 25) solid var(--color);
  border-top: calc(var(--size) / 25) solid transparent;
  /* 如果border不完整，border-radius的表现就会像月牙一样 ( 类似于括号的一般 两端很细*/
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 var(--duration) linear infinite;
  /* 现在水平方向旋转一定角度，再3d变换， 3d变换后，在新的3d方向上再旋转, 两个rotateZ不会冲突 */
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 var(--duration) linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 var(--duration) linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}

</style>
