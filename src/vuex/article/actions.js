import * as types from './mutation-type'
import ArticleModal from '../../model/Article'
import api from '../../api/article'

// 获取文章列表
export const getArticleList = ({ commit, state, dispatch }) => {
  return api.getArticleList().then((res) => {
    commit(types.GET_ARTICLE_LIST, res)
  })
}

// 获取指定文章内容
export const setEditorArticle = ({ commit, state }, payload) => {
  let item = state.list.find(value => value._id === payload._id)
  return new Promise(resolve => { resolve(commit(types.SET_EDITOR_ARTICLE, item)) })
}

// 添加文章
export const addArticle = ({ commit }, payload) => {
  return api.createArticle(new ArticleModal(payload && payload.item)).then(res => {
    commit(types.ADD_ARTICLE, res)
  })
}

// 删除文章
export const deleteArticle = ({ commit }, payload) => {
  return api.deleteArticle({ _id: payload._id }).then(() => {
    commit(types.DELETE_ARTICLE, payload._id)
  })
}

// 复制文章
export const copyArticle = ({ commit, state, dispatch }, payload) => {
  let list = state.list
  let item = Object.assign({}, list.find(value => value._id === payload.id))
  item.title += ' 的副本'
  return dispatch('addArticle', { item })
}

// 保存文章
export const saveArticle = (_, payload) => {
  return api.updateArticle(payload.item)
}
