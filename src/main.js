// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import './assets/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store/store'
// import {store} from './store/store'

// import Blob from '/components/excel/Blob.js'
// import Export2Excel from '/components/excel/Export2Excel.js'
// import unit  from './components/excel/unit.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.qs = qs
// Vue.prototype.unit = unit
Vue.use(ElementUI)

router.beforeEach(async (to, from, next) => {
  // 检测路由配置中是否有requiresAuth这个meta属性
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断是否已登录
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    // 未登录则跳转到登录界面
    next('/login')
  } else {
    next()
  }
})
router.afterEach(route => {
  window.scroll(0, 0)
})
axios.interceptors.request.use(
  config => {
  // console.log(config,"config")
    if (config.method === 'post') {
      config.headers.common['Authorization'] = localStorage.getItem('token')
    // config.headers['X-CSRF-TOKEN'] = localStorage.getItem('token') // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // console.log(response, localStorage.getItem('token'),"token",response.method)
    if (response.method === 'post') {
    // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    // console.log( localStorage.getItem('token'),"token")
      response.headers.common['Authorization'] = localStorage.getItem('token')
    // config.headers['X-CSRF-TOKEN'] = localStorage.getItem('token') // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    // console.log(response,"response main.js")
    return response
  },
  error => {
    // console.log(error, "error main.js",store)
    if (error.response) {
      switch (error.response.status) {
        case 401:
        // 跳转登录
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          store.commit('logout')
          router.push({ path: '/login' })
          // store.dispatch('LogOut').then(() => {
          // //跳转到登录页面
          //   // next('/login');
          // })
          // store.dispatch('LogOut');
          break
      }
    }
    Promise.reject(error)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
