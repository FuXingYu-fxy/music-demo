# 本来是想删掉这个的，因为 music-vue 是对该demo的重写， 但做这个毕竟当初耗费了我很多时间,没有用任何组件库，纯手写样式+布局 感觉删了有点可惜, 最后还是决定留下, 成长以后再来看这个应该有很多感触吧 :smile:, 就跟我现在看我大一做的网页一样。​

> 后端接口为 `NeteaseCloudMusicApi` 项目地址: https://github.com/Binaryify/NeteaseCloudMusicApi
# 项目截图

我称它为`负一页`, 有个小动画, 文字会从两侧缓慢飞入, 然后按钮淡入

![image-20210908205327998](..\music\image-20210908205327998.png)



首页

![image-20210908205414572](..\music\image-20210908205414572.png)



这个界面就很丑了:disappointed_relieved:...

![image-20210908205549903](..\music\image-20210908205549903.png)

# 做这个项目的时候还没有学会vuex, 所以遇到了很多困难，走了很多弯路

1. 在组件`UserFavoriteMusic.vue`组件中，设置了两个props: `favoriteSongIds`、`dailySongIds`, 接受父组件 `My.vue`传过来的音乐`id`数组, （官网说过给子组件传递一个引用类型的属性会很危险，因为子组件对其进行的修改会影响到父组件中的数据，但是这里我可以保证在子组件中不对传入的数组修改）试图在 `UserFavoriteMusic.vue`组件的 `mounted`阶段向服务器请求数据，然后页面展示歌单数据，~~但是通过自己实践得出 'mounted阶段不能获取父组件向props的传递的数据, 后面又写了一个页面验证发现可以正常获取到，就很奇怪'~~, 最后在子组件中用了`watch`监听`props`. 
2. 在写进度条的时候，一直想的是用数据驱动，不想设置dom事件，大致思路是这样的：① `MusicComponent.vue`的`mounted`阶段通过`document.createElement('audio')`创建一个`audio`标签，但是不加入`DOM`；② 然后监听 `audio.currentTime`属性，来获取当前的播放时间，音乐的总时长可以从请求的`json`中获取，也可以从`audio.duration`属性获取。用 `currentTime / duration` 后可以得到音乐的当前进度。③ 再`watch`监听`audio.currentTime`，每次变化都动态改变进度条`div`的`width`，这个进度条的样式通过`computed`返回。不知道是哪里细节写错了还是监听的对象嵌套太深，功能无法实现，头已经晕掉了。最后妥协了，在`MusicComponent.vue`组件的`mounted`阶段设置了一个事件监听程序 `audio.addEventListener('timeupdate')`来处理`currentTime`的改变。
3. ~~实现播放模式(顺序播放、单曲循环...)时，想把音乐列表通过某种方法传递给`MusicComponent.vue`组件，音乐列表原本在`UserFavoriteMusic.vue`组件中,网上大概看了下组件间共享数据，可以用vuex轻松实现，可以现在我还不会。最后的解决方案是在`UserFavoriteMusic.vue`组件的`selectMusic`方法里将 当前选中音乐所在列表的索引、当前音乐列表、当前选中音乐的详细信息合并为一个`json`，传递给`App.vue`组件，`App.vue`中将`json`作为`props`传递给`MusicComponent.vue`组件~~(最后模拟store用了单例模式解决)
# music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
