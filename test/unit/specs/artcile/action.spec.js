/**
 * Created by zhengguorong on 2016/11/30.
 */
import { expect } from 'chai'
import Article from 'src/model/Article'
const actionsInjector = require('inject!src/vuex/article/actions')

const article = new Article()
var articleList = []
articleList.push(article)
// actionsInjector的作用是替代aja，使用模拟数据替代请求接口，../../api/article为请求ajax的方法，getArticleList覆盖该文件的对应方法。
const actions = actionsInjector({
  // 文件路径相对于当前action
  '../../api/article': {
    getArticleList () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(articleList)
        }, 100)
      })
    },
    createArticle (article, cb) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(article)
        }, 100)
      })
    },
    updateArticle (articleForUpdate, cb) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(articleForUpdate)
        }, 100)
      })
    }
  }
})

// 用指定的 mutaions 测试 action 的辅助函数
const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0
  // 模拟提交
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]
    expect(mutation.type).to.equal(type)
    if (payload) {
      expect(mutation.payload).to.deep.equal(payload)
    }
    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }
  // 用模拟的 store 和参数调用 action
  action({ commit, state }, ...args)

  // 检查是否没有 mutation 被 dispatch
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

describe('article actions', () => {
  it('获取文章列表不为空', done => {
    testAction(actions.getArticleList, [], {}, [
      { type: 'GET_ARTICLE_LIST', payload: articleList },
      { type: 'SET_EDITOR_ARTICLE', payload: articleList[0] }
    ], done)
  })
  it('获取文章列表为空', done => {
    articleList = []
    testAction(actions.getArticleList, [], {}, [
      { type: 'SET_EDITOR_ARTICLE', payload: article }
    ], done)
  })
  it('添加文章', done => {
    testAction(actions.addArticle, [], {}, [
      { type: 'ADD_ARTICLE', payload: article }
    ], done)
  })
  it('设置正在编辑的文章', done => {
    testAction(actions.setEditorArticle, [], {}, [
      { type: 'SET_EDITOR_ARTICLE', payload: article }
    ], done)
  })
  it('保存文章', done => {
    testAction(actions.saveArticle, [], {}, [
      { type: 'CREATE_ARTICLE_SUCCESS', payload: '' }
    ], done)
  })
  it('更新文章', done => {
    var updateArticle = article
    updateArticle._id = '1234567'
    testAction(actions.saveArticle, [updateArticle], {}, [
      { type: 'UPDATE_ARTICLE_SUCCESS', payload: '' }
    ], done)
  })
})
