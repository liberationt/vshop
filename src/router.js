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
      tittle:'登陆页面',
      component: () => import( './pages/myShop/m-login.vue')
    },
    //shareShop 路由
    {
      path: '/shopHome',
      name: 'shopHome',
      component: () => import( './pages/shareShop/s-shophome.vue'),
      children:[
        {
          path:'/shoppage',
          name:'shoppage',
          tittle:'店铺首页',
          component:()=>import('./pages/shareShop/s-shoppage.vue')
        },
        {
          path:'/relatedproducts',
          name:'relatedproducts',
          tittle:'相关产品',
          component:()=>import('./pages/shareShop/s-relatedproducts.vue')
        },
        {
          path:'/utilities',
          name:'utilities',
          title:'实用工具',
          component:()=>import('./pages/shareShop/s-utilities.vue')
        }
      ]
    },
    {
      path:'/havemoney',
      name:'havemoney',
      tittle:'有钱花',
      component:()=>import('./pages/shareShop/s-havemoney.vue')
    },
    {
      path:'/applicationsteps',
      name:'applicationsteps',
      tittle:'申请步骤',
      component:()=>import('./pages/shareShop/s-applicationsteps.vue')
    },
    {
      path: '/myshop',
      name: 'myshop',
      title:'我的微店',
      component: () => import( './pages/myShop/m-myshop.vue')
    },
    {
      path: '/meditshop',
      name: 'meditshop',
      title:'编辑店铺',
      component: () => import( './pages/myShop/m-editshop.vue')  
    },
    {
      path: '/mshopsign',
      name: 'mshopsign',
      title:'微店招牌',
      component: () => import( './pages/myShop/m-shopsign.vue')  
    },
    {
      path: '/mshopregister',
      name: 'mshopregister',
      title:'我的客户',
      component: () => import( './pages/myShop/m-shopregister.vue')  
    },
    {
      path: '/magentproduct',
      name: 'magentproduct',
      title:'代理产品',
      component: () => import( './pages/myShop/m-agentproduct.vue')  
    },
    {
      path: '/mproductdetails',
      name: 'mproductdetails',
      title:'代理产品',
      component: () => import( './pages/myShop/m-productdetails.vue')  
    }
  ]
})
