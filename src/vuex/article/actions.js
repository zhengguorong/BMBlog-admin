import * as types from './mutation-type'
import ArticleModal from '../../model/Article'
import api from '../../api/article'

export default {
  getArticleList ({ commit, state, dispatch }) {
    return api.getArticleList().then((res) => {
      commit(types.GET_ARTICLE_LIST, res)
    })
  },
  setEditorArticle ({ commit, state }, payload) {
    let item = state.list.find(value => value._id === payload._id)
    return new Promise(resolve => { resolve(commit(types.SET_EDITOR_ARTICLE, item)) })
  },
  addArticle ({ commit }, payload) {
    return api.createArticle(new ArticleModal(payload && payload.item)).then(res => {
      commit(types.ADD_ARTICLE, res)
    })
  },
  deleteArticle ({ commit }, payload) {
    return api.deleteArticle({_id: payload._id}).then(() => {
      commit(types.DELETE_ARTICLE, payload._id)
    })
  },
  copyArticle ({ commit, state, dispatch }, payload) {
    let list = state.list
    let item = Object.assign({}, list.find(value => value._id === payload.id))
    item.title += ' 的副本'
    return dispatch('addArticle', { item })
  },
  saveArticle (_, payload) {
    return api.updateArticle(payload.item)
  }
}
