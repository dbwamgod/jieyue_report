import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'
 
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState({
    Cookies: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
