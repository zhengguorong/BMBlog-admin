/**
 * Created by zhengguorong on 2016/11/30.
 */
import * as http from '../util/http'

const getArticleList = () => {
  return http.get('/api/articles')
}

const createArticle = (article) => {
  return http.post('/api/articles', article)
}

const updateArticle = (article) => {
  return http.put('/api/articles/' + article._id, article)
}

const deleteArticle = (article) => {
  return http.delete('/api/articles/' + article._id)
}

module.exports = {
  getArticleList, createArticle, updateArticle, deleteArticle
}
