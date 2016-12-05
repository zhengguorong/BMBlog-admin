/**
 * Created by zhengguorong on 2016/11/30.
 */
import * as http from '../util/http'

const getArticleList = (cb) => {
  return http.get('/api/articles')
}

const createArticle = (article, cb) => {
  return http.post('/api/articles', article)
}

const updateArticle = (article, cb) => {
  return http.put('/api/articles/' + article._id, article)
}

module.exports = {
  getArticleList, createArticle, updateArticle
}
