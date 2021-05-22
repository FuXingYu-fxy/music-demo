import Vue from 'vue'
import App from './App'
import router from './router'
import './css/style.css'
import utils from './js/utils'

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // ;(async () => {
  //   let loginStatus = await utils.isLogined();
  //   // debugger;
  //   console.log(loginStatus);
  //   if (to.name === 'login' || to.name === 'root' || loginStatus ) {
  //     next();
  //   } else {
  //     next('/login');
  //   }
  // })();
  next();

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
