import * as types from './mutation-type'
import * as http from '../../util/http'
import Article from '../../model/Article'

/**
 * 获取文章列表
 */
export const getArticleList = ({commit}) => {
  http.get('/api/articles')
    .then(res => {
      if (res.length === 0) {
        let article = new Article()
        commit(types.SET_EDITOR_ARTICLE, article)
        commit(types.ADD_ARTICLE, article)
      } else {
        commit(types.GET_ARTICLE_LIST, res)
      }
    })
}

export const addArticle = ({commit, article}) => {
  http.post('/api/articles', article)
    .then(res => {
      commit(types.ADD_ARTICLE, res)
    })
}
