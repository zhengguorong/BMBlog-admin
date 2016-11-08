import mutations from './mutations'
import * as actions from './actions'

const state = {
  // 文章列表
  list: [],
  // 正在编辑的文章
  editorArticle: { title: '无标题文章', markdown: '', html: '' }
}

export default{
  state,
  actions,
  mutations
}
