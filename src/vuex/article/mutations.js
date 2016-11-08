import * as types from './mutation-type'

const mutations = {
  [types.GET_ARTICLE_LIST] (state, data) {
    state.list = data
  },
  [types.SET_EDITOR_ARTICLE] (state, data) {
    state.editorArticle = data
  },
  [types.ADD_ARTICLE] (state, data) {
    state.list.push(data)
  }
}

export default mutations
