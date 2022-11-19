import Vue from 'vue'
import Router from 'vue-router'
import Login from 'common/Login'
import Layout from 'common/Layout'
import Index from 'page/Index'
import User from 'page/User'
import Blog from 'page/Blog'
import {Message} from 'element-ui';
import store from '@/store'
import {getToken} from '@/request/token'
import addUser from "../components/page/addUser";
Vue.use(Router);

const router = new Router({
/*
  mode: 'history',
*/
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/layout',
      component: Layout,
      children:[
        {
          path: 'index',
          component: Index
        },
        {
          path: 'user',
          component: User
        },

        {
          path: 'blog',
          component: Blog
        }
    ]}
  ]
})
//全局路由守卫
router.beforeEach((to, from, next) => {

  if (getToken()) {
    if (to.path === '/') {
      next({path: '/login'})
      console.info("111")
    } else {
      if (store.state.account.length === 0) {
        store.dispatch('getUserInfo').then(data => { //获取用户信息
          next()
        }).catch(() => {
          Message({
            type: 'warning',
            showClose: true,
            message: '登录已过期'
          })
          next({path: '/'})
        })
      } else {

        next()
      }
    }
  } else {
    if (to.matched.some(r => r.meta.requireLogin)) {
      Message({
        type: 'warning',
        showClose: true,
        message: '请先登录哦'
      })

    }
    else {
      next();
    }
  }
})


export default router
