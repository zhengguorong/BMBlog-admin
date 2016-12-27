import * as types from './types'
import ArticleModal from '../../model/Article'
import api from '../../api/article'

export default {
  [types.GET_ARTICLE_LIST] ({ commit, state, dispatch }) {
    return api.getArticleList().then((res) => {
      commit(types.GET_ARTICLE_LIST, res)
    })
  },
  [types.SET_EDITOR_ARTICLE] ({ commit, state }, payload) {
    let item = state.list.find(value => value._id === payload._id)
    return new Promise((resolve, reject) => commit(types.SET_EDITOR_ARTICLE, item))
  },
  [types.ADD_ARTICLE] ({ commit }, payload) {
    return api.createArticle(new ArticleModal(payload && payload.item)).then(res => {
      commit(types.ADD_ARTICLE, res)
    })
  },
  [types.DELETE_ARTICLE] ({ commit }, payload) {
    return api.deleteArticle({_id: payload._id}).then(() => {
      commit(types.DELETE_ARTICLE, payload._id)
    })
  },
  [types.ADD_COPY_ARTICLE] ({ commit, state, dispatch }, payload) {
    let list = state.list
    let item = Object.assign({}, list.find(value => value._id === payload.id))
    item.title += ' 的副本'
    return dispatch(types.ADD_ARTICLE, { item })
  },
  [types.UPDATE_ARTICLE] (_, payload) {
    return api.updateArticle(payload.item)
  }
}
