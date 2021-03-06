import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import {
  statistics
} from 'wisdom-h5'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: "我的首页",
        content: 'disabyfgelalale你好呀',
        auth: true
      },
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        auth: true
      },
      component: () =>
        import ( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'mlogin',
      tittle: '登陆页面',
      component: () =>
        import ('./pages/myShop/m-login.vue')
    },
    {
      path: '/register',
      name: 'register',
      tittle: '注册页面',
      component: () =>
        import ('./pages/shareShop/register.vue')
    },
    {
      path: '/mlogin',
      name: 'mlogin',
      tittle: '登陆页面',
      component: () =>
        import ('./pages/myShop/m-login.vue')
    },
    //shareShop 路由
    {
      path: '/shopHome',
      name: 'shopHome',
      component: () =>
        import ('./pages/shareShop/s-shophome.vue'),
      children: [{
          path: '/shoppage',
          name: 'shoppage',
          tittle: '店铺首页',
          meta: {
            tittle: '1'
          },
          component: () =>
            import ('./pages/shareShop/s-shoppage.vue')
        },
        {
          path: '/relatedproducts',
          name: 'relatedproducts',
          tittle: '相关产品',
          meta: {
            tittle: '2'
          },
          component: () =>
            import ('./pages/shareShop/s-relatedproducts.vue')
        },
        {
          path: '/utilities',
          name: 'utilities',
          title: '实用工具',
          meta: {
            tittle: '3'
          },
          component: () =>
            import ('./pages/shareShop/s-utilities.vue')
        },
        {
          path: '/loanlist',
          name: 'loanlist',
          tittle: '产品列表',
          meta: {
            tittle: '2'
          },
          component: () =>
            import ('./pages/shareShop/s-loanlist.vue')
        }
      ]
    },
    {
      path: '/havemoney',
      name: 'havemoney',
      tittle: '有钱花',
      component: () =>
        import ('./pages/shareShop/s-havemoney.vue')
    },
    {
      path: '/applicationsteps',
      name: 'applicationsteps',
      tittle: '申请步骤',
      component: () =>
        import ('./pages/shareShop/s-applicationsteps.vue')
    },
    {
      path: '/applicationloan',
      name: 'applicationloan',
      tittle: '申请贷款',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: () =>
        import ('./pages/shareShop/s-applicationloan.vue')
    },
    {
      path: '/essentialinformation',
      name: 'essentialinformation',
      tittle: '基本信息',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: () =>
        import ('./pages/shareShop/s-essentialinformation.vue')
    },
    {
      path: '/undershelf',
      name: 'undershelf',
      tittle: '产品下架',
      component: () =>
        import ('./pages/myShop/m-undershelf.vue')
    },
    {
      path: '/workinformation',
      name: 'workinformation',
      tittle: '工作信息',
      component: () =>
        import ('./pages/shareShop/s-workinformation.vue')
    },
    {
      path: '/supplementary',
      name: 'supplementary',
      tittle: '填充信息',
      component: () =>
        import ('./pages/shareShop/s-supplementary.vue')
    },
    {
      path: '/productnamedetail',
      name: 'productnamedetail',
      tittle: '产品详情',
      component: () =>
        import ('./pages/shareShop/s-productnamedetail.vue')
    },
    {
      path: '/serviceagreement',
      name: 'serviceagreement',
      tittle: '服务协议',
      component: () =>
        import ('./pages/shareShop/s-serviceagreement.vue')
    },
    {
      path: '/errors',
      name: 'errors',
      tittle: '404',
      component: () =>
        import ('./pages/shareShop/errors.vue')
    },
    {
      path: '/city',
      name: 'city',
      tittle: '城市',
      component: () =>
        import ('./pages/shareShop/city.vue')
    },
    {
      path: '/citylist',
      name: 'citylist',
      tittle: '城市列表',
      component: () =>
        import ('./pages/shareShop/citylist.vue')
    },
    {
      path: '/tweetsdetails',
      name: 'tweetsdetails',
      tittle: '城市列表',
      component: () =>
        import ('./pages/shareShop/s-tweetsdetails.vue')
    },
    {
      path: '/stiflingborrow',
      name: 'stiflingborrow',
      tittle: '虫虫借钱',
      component: () =>
        import ('./pages/shareShop/s-stiflingborrow.vue')
    },
    {
      path: '/myshop',
      name: 'myshop',
      title: '我的微店',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-myshop.vue')
    },
    {
      path: '/meditshop',
      name: 'meditshop',
      title: '编辑店铺',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-editshop.vue')
    },
    {
      path: '/mshopsign',
      name: 'mshopsign',
      title: '微店招牌',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-shopsign.vue')
    },
    {
      path: '/Proxyagreement',
      name: 'Proxyagreement',
      title: '微店代理协议',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-proxyagreement.vue')
    },

    {
      path: '/mshopregister',
      name: 'mshopregister',
      meta: {
        title: "我的客户",
        content: '我的客户你好呀',
        name: 'kakakakkakakaka',
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-shopregister.vue')
    },
    {
      path: '/magentproduct',
      name: 'magentproduct',
      title: '代理产品',
      component: () =>
        import ('./pages/myShop/m-agentproduct.vue')
    },
    {
      path: '/commissionwithdrawal',
      name: 'commissionwithdrawal',
      title: '佣金提现',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-commissionwithdrawal.vue')
    },
    {
      path: '/bankcard',
      name: 'bankcard',
      title: '添加银行卡',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-bankcard.vue')
    },
    {
      path: '/successfulwithdrawals',
      name: 'successfulwithdrawals',
      title: '提现成功',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-successfulwithdrawals.vue')
    },
    {
      path: '/commissiondetails',
      name: 'commissiondetails',
      title: '佣金明细',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-commissiondetails.vue')
    },
    {
      path: '/myujishouyi',
      name: 'myujishouyi',
      title: '预计收益',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-yujishouyi.vue')
    },
    {
      path: '/cashdetails',
      name: 'cashdetails',
      title: '现金明细',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-cashdetails.vue')
    },
    {
      path: '/readydetails',
      name: 'readydetails',
      title: '流水详情',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-readydetails.vue')
    },
    {
      path: '/mycommission',
      name: 'mycommission',
      title: '我的佣金',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-mycommission.vue')
    },
    {
      path: '/withdrawalsrecord',
      name: 'withdrawalsrecord',
      title: '我的佣金',
      component: () =>
        import ('./pages/myShop/m-withdrawalsrecord.vue')
    },
    {
      path: '/mproductdetails',
      name: 'mproductdetails',
      title: '代理产品',
      component: () =>
        import ('./pages/myShop/m-productdetails.vue')
    },
    {
      path: '/muserdetails',
      name: 'muserdetails',
      title: '客户详情',
      component: () =>
        import ('./pages/myShop/m-userdetails.vue')
    },
    {
      path: '/mselfsupport',
      name: 'mselfsupport',
      title: '自营产品',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-selfsupport.vue')
    },
    {
      path: '/maddproduct',
      name: 'maddproduct',
      title: '添加/编辑自营产品今年',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-addproduct.vue')
    },
    {
      path: '/mselfshopdetails',
      name: 'mselfshopdetails',
      title: '产品详情',
      component: () =>
        import ('./pages/myShop/m-selfshopdetails.vue')
    },
    {
      path: '/mshopapply',
      name: 'mshopapply',
      title: '我的订单',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-shopapply.vue')
    },
    {
      path: '/mwithdrawal',
      name: 'mwithdrawal',
      title: '提现记录',
      meta: {
        auth: true
      },
      component: () =>
        import ('./pages/myShop/m-withdrawal.vue')
    },
    {
      path: '/mshopapplydetails',
      name: 'mshopapplydetails',
      title: '订单详情',
      component: () =>
        import ('./pages/myShop/m-shopapplydetails.vue')
    },
    {
      path: '/mquanxuan',
      name: 'mquanxuan',
      title: '订单详情',
      component: () =>
        import ('./pages/myShop/m-xuanxuan.vue')
    },
    {
      path: '/share',
      name: 'share',
      title: '分享',
      component: () =>
        import ('./pages/myShop/share.vue')
    },
    {
      path: '/mRegister',
      name: 'mRegister',
      title: '推广注册页',
      component: () =>
        import ('./pages/myShop/m-register.vue')
    },
    {
      path: '/magree',
      name: 'magree',
      title: '用户服务协议',
      component: () =>
        import ('./pages/myShop/m-agree.vue')
    },
    {
      path: '/magree1',
      name: 'magree1',
      title: '用户服务协议',
      component: () =>
        import ('./pages/myShop/m-agree1.vue')
    },
    {
      path: '/mtixieyi',
      name: 'mtixieyi',
      title: '提现规则',
      component: () =>
        import ('./pages/myShop/m-tixieyi.vue')
    },
    {
      path: '/mopening',
      name: 'mopening',
      title: '提现规则',
      component: () =>
        import ('./pages/myShop/m-opening.vue')
    }
  ]
})
// 微店打点
router.beforeEach((to, from, next) => {
  statistics.beforeEach('weidian', to, from, next)
  window.scrollTo(0,0)
  next()
})

export default router
