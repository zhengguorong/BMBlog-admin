import mutations from './mutations'
import * as actions from './actions'

const state = {
  editorElement: {}, // 正在编辑的元素
  editorPage: {}, // 正在编辑的页面
  themeList: [], // 用户所有主题列表
  editorTheme: {} // 正在编辑的主题
}

export default{
  state,
  actions,
  mutations
}
