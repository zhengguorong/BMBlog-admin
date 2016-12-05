import * as types from './mutation-type'
import Article from '../../model/Article'
import api from '../../api/article'

/**
 * 获取文章列表
 */
export const getArticleList = ({commit}) => {
  api.getArticleList((res) => {
    if (res.length === 0) {
      let article = new Article()
      commit(types.SET_EDITOR_ARTICLE, article)
    } else {
      commit(types.GET_ARTICLE_LIST, res)
      commit(types.SET_EDITOR_ARTICLE, res[0])
    }
  })
}

/**
 * 添加文章
 * @param commit
 * @param article
 * @constructor
 */
export const addArticle = ({commit}, article) => {
  commit(types.ADD_ARTICLE, article)
}

/**
 * 设置正在编辑的文章
 * @param commit
 * @param article
 */
export const setEditorArticle = ({commit}, article) => {
  commit(types.SET_EDITOR_ARTICLE, article)
}

/**
 * 保存或修改文章
 * @param commit
 * @param article
 */
export const saveArticle = ({commit}, article) => {
  if (article && article._id) {
    api.updateArticle(article, (res) => {
      commit(types.UPDATE_ARTICLE_SUCCESS)
    })
  } else {
    api.createArticle(article, (res) => {
      commit(types.CREATE_ARTICLE_SUCCESS)
    })
  }
}
