import * as types from './mutation-type'
import Article from '../../model/Article'
import api from '../../api/article'
import tools from '../../util/tools'

/**
 * 获取文章列表
 */
export const getArticleList = ({commit}) => {
  api.getArticleList((res) => {
    if (res.length === 0) {
      let article = new Article()
      commit(types.SET_EDITOR_ARTICLE, article)
      commit(types.ADD_ARTICLE, article)
    } else {
      commit(types.GET_ARTICLE_LIST, res)
      commit(types.SET_EDITOR_ARTICLE, res[0])
    }
  })
}

export const saveArticle = ({commit}, article) => {
  if (article && article._id) {
    api.updateArticle(tools.vue2json(article), (res) => {
      commit(types.UPDATE_ARTICLE_SUCCESS, res)
    })
  } else {
    api.saveArticle(tools.vue2json(article), (res) => {
      commit(types.ADD_ARTICLE_SUCCESS, res)
    })
  }
}
