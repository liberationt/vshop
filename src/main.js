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
Vue.use(Api)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
