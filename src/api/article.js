/**
 * Created by zhengguorong on 2016/11/30.
 */
import * as http from '../util/http'

const getArticleList = (cb) => {
  http.get('/api/articles')
    .then(res => {
      cb(res)
    })
}

const createArticle = (article, cb) => {
  http.post('/api/articles', article)
    .then(res => {
      cb(res)
    })
}

const updateArticle = (article, cb) => {
  http.put('/api/articles/' + article._id, article)
    .then(res => {
      cb(res)
    })
}

module.exports = {
  getArticleList, createArticle, updateArticle
}
