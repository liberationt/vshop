import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')  
    },
    {
      path: '/mlogin',
      name: 'mlogin',
      component: () => import( './pages/myShop/m-login.vue') //登录
    },
    {
      path: '/myshop',
      name: 'myshop',
      component: () => import( './pages/myShop/m-myshop.vue') // 我的微店
    }
  ]
})
