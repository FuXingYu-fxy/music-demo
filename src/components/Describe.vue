<template>
  <div class="text">
    <p class="first-p animation">
      在我们记忆深处，很多生活影像也许已经淡黄，朦胧
    </p>
    <br />
    <p class="second-p animation">然而</p>
    <br />
    <p class="third-p animation">
      那些曾经叩击我们心灵的声音，会时常穿越时空，在我们耳畔深情地响起
    </p>
    <p class="button-container" ref="btns">
      <a href="https://github.com/fuxingyu-fxy">GitHub</a>
      <a @click="goHome">Get Started</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    let maxAnimationCount = 3;
    let listP = document.querySelectorAll(".animation");
    setTimeout(() => {
      listP[0].style.setProperty("animation-play-state", "running");
    }, 1000);
    setTimeout(() => {
      listP[1].style.setProperty("animation-play-state", "running");
    }, 2700);
    setTimeout(() => {
      listP[2].style.setProperty("animation-play-state", "running");
    }, 3200);
    let animationCounter = 0;
    function foo() {
      // let foo = () => {
      animationCounter++;
      // 在倒数第二个动画结束后就可以开始显示两个按钮了
      if (animationCounter < maxAnimationCount - 1) return;
      this.$refs.btns.style.setProperty("animation-play-state", "running");
      document.removeEventListener("animationend", bindFoo);
    }
    let bindFoo = foo.bind(this);
    document.addEventListener("animationend", bindFoo);
  },
  components: {},
  methods: {
    goHome() {
      this.$router.push("/home").catch(reason => console.log("导航失败，预计原因是用户未登录"));
    },
  },

};
</script>

<style scoped>
.text > p {
  margin: 0;
}

@keyframes text-fly-in-left {
  0% {
    opacity: 0;
    transform: translateX(-30rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes text-fly-in-right {
  0% {
    opacity: 0;
    transform: translateX(30rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes text-render {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.first-p {
  animation: text-fly-in-left var(--delay);
}
.second-p {
  animation: text-render 5s;
}
.third-p {
  animation: text-fly-in-right var(--delay);
}
.text .animation {
  animation-play-state: paused;
}

.text {
  --delay: 2s;
  overflow: hidden;
  position: relative;
  top: 10rem;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
}

.text .button-container {
  margin: 6rem 0;
  animation: text-render 1s paused;
}

.button-container a {
  font-weight: normal;
  border-radius: 2rem;
  border: 1px solid #42b983;
  box-sizing: border-box;
  /*color: var(--theme-color, #42b983);*/
  color: #42b983;
  display: inline-block;
  font-size: 1.05rem;
  letter-spacing: 0.1rem;
  margin: 0.5rem 1rem;
  padding: 0.75em 2rem;
  text-decoration: none;
  transition: all 0.15s ease;
  background-color: #fff;
}

.button-container a:last-child {
  /*background-color: var(--theme-color, #42b983);*/
  background-color: #42b983;
  color: #fff;
}

.button-container a:hover {
  color: black;
  filter: contrast(150%);
  cursor: pointer;
}
</style>
