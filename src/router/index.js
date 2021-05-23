import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由懒加载
const Home = () => import('@/components/Home.vue');
const My = () => import('@/components/My.vue');
const About = () => import('@/components/About.vue');
const More = () => import('@/components/More.vue');
const Describe = () => import('@/components/Describe.vue');
const Music = () => import('@/components/Music.vue');
// const UserFavoriteMusic = () => import('@/components/UserFavoriteMusic');
const Login = () => import('@/components/Login.vue');

let routes = [
  {
    path: '/',
    name: 'root',
    components: { describe: Describe },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/music',
    name: 'music',
    components: { default: Music },
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: false
    }

  },
  {
    path: '/my',
    // name: 'my',  // 当父级路由嵌套有默认子路由时，不能使用 name 进行导航，使用path 或者删掉name
    component: My,
    meta: {
      keepAlive: true
    }
    // children: [
    //   {
    //     // 进入时重定向至 今日推荐
    //     path: '',
    //     redirect: 'todayrecommend'
    //   },
    //   {
    //     // 默认子路由
    //     path: 'todayrecommend',
    //     component: UserFavoriteMusic
    //   },
    //   {
    //     path: ':id',
    //     component: UserFavoriteMusic
    //   }
    // ]

  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/more',
    name: 'more',
    component: More,
    meta: {
      keepAlive: false
    }
  }
]
const router = new Router({
  routes,
  mode: 'history',
})

// router.beforeEach  router.beforeResolve  router.afterEach


export default router
