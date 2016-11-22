import Vue from 'vue'
import Vuex from 'vuex'
import article from './article'
import editor from './editor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    article,
    editor
  }
})
