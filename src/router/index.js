import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('@/components/Home.vue');
const My = () => import('@/components/My.vue');
const About = () => import('@/components/About.vue');
const More = () => import('@/components/More.vue');
const Describe = () => import('@/components/Describe.vue');

let routes = [
  {
    path: '/',
    components: {describe: Describe},
  },
  {
    path: '/home',
    name: 'home',
    component: Home,

  },
  {
    path: '/my',
    name: 'my',
    component: My
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