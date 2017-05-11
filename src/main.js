// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import {Message} from 'element-ui'
import Qs from 'qs'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
require('../config')

Vue.use(ElementUI)
Vue.component('icon', Icon)
Vue.config.productionTip = false

serverUrl = process.env.NODE_ENV === 'production' ? 'http://dev.edaoe.com' : 'http://localhost'

api = axios.create({
  baseURL: serverUrl,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    if (!data)
      data = {}
    if (!data.hasOwnProperty("username"))
      data.authcode = authcode
    data = Qs.stringify(data, {arrayFormat: 'brackets'})
    return data
  }]
})

api.interceptors.response.use(response => {
  let data = response.data
  if (!data.isOk) {
    if (data.errno === -2) {
      Message.error('用户信息已过期，请重新登录！')
      authcode = null
      vue.$router.push('/login')
    }
  }
  return data
}, function (error) {
  Message.error('服务器连接失败！')
  return Promise.reject(error)
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (authcode)
      next('/layout/index')
    else
      next()
  } else {
    if (authcode)
      next()
    else
      next('/login')
  }
})

vue=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
