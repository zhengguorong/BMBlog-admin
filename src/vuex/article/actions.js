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
        commit(types.SET_EDITOR_ARTICLE, res[0])
      }
    })
}

export const saveArticle = ({commit}, article) => {
  if (article && article._id) {
    http.put('/api/articles/' + article._id, JSON.parse(JSON.stringify(article)))
      .then(res => {
        commit(types.UPDATE_ARTICLE_SUCCESS, res)
      })
  } else {
    http.post('/api/articles', JSON.parse(JSON.stringify(article)))
      .then(res => {
        commit(types.ADD_ARTICLE_SUCCESS, res)
      })
  }
}
