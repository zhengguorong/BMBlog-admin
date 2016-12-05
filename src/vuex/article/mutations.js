import * as types from './mutation-type'
import Article from '../../model/Article'

const mutations = {
  [types.GET_ARTICLE_LIST] (state, data) {
    state.list = data.reverse()
  },
  [types.SET_EDITOR_ARTICLE] (state, data) {
    state.editorArticle = data
  },
  [types.ADD_ARTICLE] (state, data) {
    state.list.unshift(new Article())
  }
}
export default mutations
