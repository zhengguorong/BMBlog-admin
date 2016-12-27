import * as types from './mutation-type'

const mutations = {
  [types.GET_ARTICLE_LIST] (state, data) {
    state.list = data
  },
  [types.SET_EDITOR_ARTICLE] (state, data) {
    state.editorArticle = data
  },
  [types.SET_EDITOR_TITLE] (state, data) {
    state.editorArticle.title = data || '无标题文章'
  },
  [types.SET_EDITOR_CONTENT] (state, data) {
    state.editorArticle.markdown = data
  },
  [types.ADD_ARTICLE] (state, data) {
    state.list.push(data)
    state.editorArticle = data
  },
  [types.DELETE_ARTICLE] (state, data) {
    let list = state.list
    let index = list.findIndex(value => value._id === data)
    if (data === state.editorArticle._id) {
      state.editorArticle = {}
    }
    list.splice(index, 1)
  }
}
export default mutations
