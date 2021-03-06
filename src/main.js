import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/utils' 
import wx from 'weixin-js-sdk'
// import http from './utils/http'
import Api from './utils/api'
import 'lib-flexible'
import scroll from 'vue-seamless-scroll'
// 引用切图js
import clipper from './static/clipper'
// 导航栏
import { NavBar  } from 'vant';
// 下拉刷新
import { PullRefresh,List,Toast} from 'vant';
// 布局
import { Row, Col ,Dialog} from 'vant';
Vue.use(Row).use(Col);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(Dialog)
Vue.use(List)
Vue.use(Toast)
Vue.use(scroll)
Vue.use(wx)
Vue.use(clipper)
//兼容ie10 以上
import '@babel/polyfill'
if (!store.state.actives ) {
  // 从sessionStorage中读取状态
  store.state.actives = utils.getlocal('actives')
}
// 设置title meta
router.beforeEach((to, from, next) => {
  // console.log('router===>',to.meta.content)
  /* 路由发生变化修改页面meta */
  // console.log(to)
  if(to.path=='/shoppage'){
    store.state.actives='1'
  }
  if(to.path=='/relatedproducts'||to.path=='/loanlist'){
    store.state.actives='2'
  }
  if(to.path=='/utilities'){
    store.state.actives='3'
  }
  if(to.meta.content){
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    // console.log(meta)
    meta.content = to.meta.content;
    head[0].appendChild(meta)
    // console.log(head[0])
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    store.state.title = to.meta.title
    document.title = to.meta.title;
    // console.log(document.title)
  }
  if (to.matched.some( m => m.meta.auth)) {
    // 对路由进行验证
    if (utils.getCookie('user')) { // 已经登陆
      next()
    } else {
      // 未登录,跳转到登陆页面。
      Toast('请去登录')
      next({ path: '/mlogin'})
      store.commit('setUrl', window.location.origin+'/mlogin')
    }
  } else {
    next()
  }
  if (!store.state.iosUrls) {
    store.commit('setUrls', document.URL)
  }
  // 微信分享 链接存储
  if (!store.state.iosUrl) {
    store.commit('setUrl', document.URL)
  }
  next()
});


Vue.use(Api)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



