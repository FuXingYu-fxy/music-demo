<template>
  <div class="carousel">
    <ul>
      <li class="item item1">
        <img src="../image/img_1.png" alt="">
      </li>

      <li class="item item2">
        <img src="../image/img_2.png" alt="">
      </li>

      <li class="item item3">
        <img src="../image/img_3.png" alt="">
      </li>

      <li class="item item4">
        <img src="../image/img_4.png" alt="">
      </li>

      <li class="item item5">
        <img src="../image/img_5.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      itemList: [],
      timer: 0,
      carousel: null,
    }
  },
  methods: {
    updateStyle(itemList) {
      let len = itemList.length;
      // 倒数第一个，在最右边
      itemList[len - 1].style.transform = 'translateX(300px)';
      // 倒数第二个， 在中间, 然后中间的z-index最大, 并且1.3倍大小
      itemList[len - 2].style.cssText = `z-index:997;transform:scale(1.5) translateX(0); opacity:1;`;
      // 倒数第三个， 在最左边
      itemList[len - 3].style.transform = 'translateX(-300px)';
    },
    next(itemList, reverse = false) {
      // 传入true, 功能就是 previous
      let li;
      if (!reverse) {
        li = itemList.pop();
        itemList.unshift(li);
      } else {
        li = itemList.shift();
        itemList.push(li);
      }
      // 重置样式
      this.resetStyle(itemList);
      this.updateStyle(itemList);
    },
    resetStyle(list) {
      for (let i = 0; i < list.length; i++) {
        list[i].style.cssText = `transform:scale(1)`;
      }
    },
    mouseover(e) {
      clearInterval(this.timer);
      // 移除该事件
      this.carousel.removeEventListener('mouseover', this.mouseover);

      // 重新添加mouseout事件
      this.carousel.addEventListener('mouseout', this.mouseout);
    },
    mouseout(e) {
      this.timer = setInterval(this.next, 2000,  this.itemList);
      // 移除该事件
      this.carousel.removeEventListener('mouseout', this.mouseout);
      // 重新添加mouseover事件
      this.carousel.addEventListener('mouseover', this.mouseover);
    }
  },
  mounted() {
    let itemList = document.querySelectorAll('.item');
    this.carousel = document.querySelector('.carousel');
    this.itemList = [...itemList];
    this.updateStyle(this.itemList);

    this.timer = setInterval(this.next, 2000, this.itemList);

    this.carousel.addEventListener('mouseover', this.mouseover);
    this.carousel.addEventListener('mouseout', this.mouseout);
  }
  ,
  components: {}
}
</script>

<style scoped>

.carousel, .carousel > * {
  list-style: none;
  padding: 0;
  margin: 0;
}

.carousel {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 3;
  cursor: pointer;
  /*text-align: center;*/
  height: 100%;
  width: 100%;
}
.carousel ul {
  width: 70%;
  height: 100%;
}

/* 限制图片大小 */
.item {
  position: absolute;
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9acd32;
  transition: 1s;
  z-index: -1;
  opacity: .5;
}
.item > img {
  width: 100%;
  height: auto;
}

.item:nth-child(2) {
  background: cadetblue;
}

.item:nth-child(3) {
  background: #38ebf1;
}

.item:nth-child(4) {
  background: #23ffa7;
}

.item:nth-child(5) {
  background: #bb9bf1;
}
</style>
