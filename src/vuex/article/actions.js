import * as types from './types'
import ArticleModal from '../../model/Article'
import api from '../../api/article'

export default {
  [types.GET_ARTICLE_LIST] ({ commit, state, dispatch }) {
    api.getArticleList().then((res) => {
      if (res.length === 0) {
        dispatch(types.ADD_ARTICLE)
      } else {
        commit(types.GET_ARTICLE_LIST, res)
      }
    })
  },
  [types.SET_EDITOR_ARTICLE] ({ commit, state }, payload) {
    let item = state.list.find(value => value._id === payload.id)
    commit(types.SET_EDITOR_ARTICLE, item)
  },
  [types.ADD_ARTICLE] ({ commit }, payload) {
    api.createArticle(new ArticleModal(payload && payload.item)).then(res => {
      commit(types.ADD_ARTICLE, res)
    })
  },
  [types.DELETE_ARTICLE] ({ commit }, payload) {
    commit(types.DELETE_ARTICLE, payload.id)
  },
  [types.ADD_COPY_ARTICLE] ({ commit, state, dispatch }, payload) {
    let list = state.list
    let item = Object.assign({}, list.find(value => value._id === payload.id))
    item.title += ' 的副本'
    dispatch(types.ADD_ARTICLE, { item })
  },
  [types.UPDATE_ARTICLE] (_, payload) {
    api.updateArticle(payload.item).then(res => {
      console.log('保存成功')
      console.log(res)
    })
  }
}
