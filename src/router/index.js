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
const UserFavoriteMusic = () => import('@/components/UserFavoriteMusic');

let routes = [
  {
    path: '/',
    components: { describe: Describe },
  },
  {
    path: '/music',
    name: 'music',
    components: { default: Music }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,

  },
  {
    path: '/my',
    // name: 'my',  // 当父级路由嵌套有默认子路由时，不能使用 name 进行导航，使用path 或者删掉name
    component: My,
    children: [
      {
        // 进入时重定向至 今日推荐
        path: '',
        redirect: 'todayrecommend'
      },
      {
        // 默认子路由
        path: 'todayrecommend',
        component: UserFavoriteMusic
      },
      {
        path: ':id',
        component: UserFavoriteMusic
      }
    ]

  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/more',
    name: 'more',
    component: More
  }
]
const router = new Router({
  routes,
  mode: 'history',
})

export default router