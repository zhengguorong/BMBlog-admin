import * as types from './mutation-type'
import * as http from '../../util/http'

/**
 * 获取文章列表
 */
export const getArticleList = ({commit}) => {
  http.get('/api/articles')
    .then(res => {
      commit(types.GET_ARTICLE_LIST, res)
    })
}

export const addArticle = ({commit, article}) => {
  http.post('/api/articles', article)
    .then(res => {
      commit(types.ADD_ARTICLE, res)
    })
}
