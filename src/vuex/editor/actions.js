import * as types from './mutation-type'
import api from '../../api/editor'
import Page from '../../model/Page'
import Theme from '../../model/Theme'
import Element from '../../model/Element'

/**
 * 保存页面数据
 */
export const saveTheme = ({commit}, theme) => {
  if (theme && theme._id) {
    api.updateTheme(theme, (res) => {
      commit(types.UPDATE_THEME_SUCCESS, res)
    })
  } else {
    api.saveTheme(theme, (res) => {
      commit(types.ADD_THEME_SUCCESS, res)
    })
  }
}

/**
 * 获取用户所有场景主题
 * @param commit
 */
export const getUserThemeList = ({commit}) => {
  api.getUserThemeList((res) => {
    commit(types.GET_USER_THEME_LIST, res)
  })
}

/**
 * 创建场景主题
 * @param commit
 */

export const createTheme = ({commit}) => {
  var theme = new Theme()
  commit(types.CREATE_THEME, theme)
  commit(types.SET_CUR_EDITOR_THEME, theme)
}

/**
 * 设置当前编辑的主题
 */
export const setEditorTheme = ({commit}, theme) => {
  commit(types.SET_CUR_EDITOR_THEME, theme)
}

/**
 * 设置当前正在编辑的页面
 * @param commit
 * @param page
 */
export const setEditorPage = ({commit}, page) => {
  commit(types.SET_CUR_EDITOR_PAGE, page)
}

/**
 * 给主题添加页面
 * @param commit
 */
export const addPage = ({commit}) => {
  var page = new Page()
  commit(types.ADD_PAGE, page)
  commit(types.SET_CUR_EDITOR_PAGE, page)
}

/**
 * 添加页面元素
 */
export const addElement = ({commit}, data) => {
  var element = new Element(data)
  commit(types.ADD_PIC_ELEMENT, element)
  commit(types.SET_CUR_EDITOR_ELEMENT, element)
}

export const setEditorElement = ({commit}, element) => {
  commit(types.SET_CUR_EDITOR_ELEMENT, element)
}

export const playAnimate = ({commit}) => {
  commit(types.PLAY_ANIMATE)
}
