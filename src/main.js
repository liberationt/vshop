import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import http from './utils/http'
import Api from './utils/api'
import 'lib-flexible'
// 导航栏
import { NavBar  } from 'vant';
// 下拉刷新
import { PullRefresh,List } from 'vant';
// 布局
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(List)

//兼容ie10 以上
import '@babel/polyfill'

Vue.use(Api)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
