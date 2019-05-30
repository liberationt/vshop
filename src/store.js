import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    actives:'',
  },
  mutations: {
    getactive(state,actives){
      state.actives = actives
    }
  },
  actions: {

  }
})