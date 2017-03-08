// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'axios'
import animate from 'animate.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$http = Axios
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('user-token');
  if(to.path == '/signin'){ // 如果是跳转到登录页的
    if(token != 'null' && token != null){
      next('/news') // 如果有token就转向news不返回登录页
    }else{
    next();
    } // 否则跳转回登录页
  }
  else if(to.path == '/signup'){
  	next()
  }
  else{
    if(token != 'null' && token != null){
      next() // 如果有token就正常转向
    }else{
      next('/signin') // 否则跳转回登录页
    }
  }
})
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
