import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/utils' 
// import http from './utils/http'
import Api from './utils/api'
import 'lib-flexible'
// 导航栏
import { NavBar  } from 'vant';
// 下拉刷新
import { PullRefresh,List } from 'vant';
// 布局
import { Row, Col ,Dialog} from 'vant';
Vue.use(Row).use(Col);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(Dialog)
Vue.use(List)

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
  next()
});


Vue.use(Api)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



