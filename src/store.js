import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //存值
    actives:'',
    title:'',
    iosUrl: null,
    iosUrls:null
  },
  mutations: { //修改
    getactive(state,actives){
      state.actives = actives
    },
    titlechange(state,title){
      state.title = title
    },
    setUrl: (state, newVal) => { state.iosUrl = newVal },
    setUrls: (state, newVal) => { state.iosUrls = newVal }
  },
  actions: { // 异步

  }
})