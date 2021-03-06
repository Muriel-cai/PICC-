// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// export const store = new Vuex.Store({
//   // 设置属性
//   state: {
//     isLogin: false,
//     name:''
//   },

//   // 获取属性的状态
//   getters: {
//     //获取登录状态
//     isLogin: state => state.isLogin,
//     name: state => state.name
//   },

//   // 设置属性状态
//   mutations: {
//     //保存登录状态
//     userStatus(state, flag , name) {
//       console.log("111name")
//       state.isLogin = flag
//       state.name = name
//     },
//   },

//   // 应用mutations
//   actions: {
//     //获取登录状态
//     userLogin({commit}, flag , name) {
//       console.log(flag , name,"PPPPPPPPPPP++++++++______________")
//       commit("userStatus", flag , name)
//     },
//   }
// })
// export default{
//   store

// }
import { Message } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// let $msgbox = Message;//方法都需要定义后使用
// let $alert = Message.alert;
// 直接$alert()的方式使用即可（注意不是this.$alert()）,组件中使用仍需要再main.js配置

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    Login ({commit}, param) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
        axios.post('/api/login', param)
          .then(res => {
            // console.log(res,"resp");
            if (res.data.statusText === 'false') {
              Message('账号或者密码错误')
            }
            const token = res.data.data.token
            const user = res.data.data.userName
            const userId = res.data.data.userId
            // console.log(userId,"[[[[[[[[")
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            localStorage.setItem('name', user)
            // localStorage.setItem('token', token);
            // console.log(localStorage.getItem('token'),"jfjfjfjfjfkk")
            // 每次请求接口时，需要在headers添加对应的Token验证
            axios.defaults.headers.common['Authorization'] = token
            // 更新token
            commit('auth_success', token, user)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            reject(err)
          })
      })
    },
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.post('/api/logout')
          .then(response => {
            // removeIsLogin()
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
            delete axios.defaults.headers.common['Authorization']
            commit('logout')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})

export default store
