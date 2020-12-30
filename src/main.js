import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/api/config'
import './mock'
import qs from 'qs'

// 第三方包
import ElementUI from 'element-ui'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(ElementUI)
Vue.prototype.$http = http

// Vue.config.productionTip = false

var axios1 = require('axios')
axios.defaults.baseURL = 'http://localhost:3333'//需要加东西
Vue.prototype.$axios = axios1
Vue.prototype.$qs = qs
Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.headers.common['token'] = store.state.user.token;
// axios.defaults.baseURL = "http://localhost:8080"
// Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')
  let token = store.state.user.token
  // 过滤登录页，防止死循环
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('addMenu', router)
  }
}).$mount('#app')
