import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    actives:'',
    title:''
  },
  mutations: {
    getactive(state,actives){
      state.actives = actives
    },
    titlechange(state,title){
      state.title = title
    }
  },
  actions: {

  }
})