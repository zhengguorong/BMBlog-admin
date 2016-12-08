import * as types from './mutation-type'
import * as app from '../../util/appConst'

const mutations = {
  [types.SET_CUR_EDITOR_ELEMENT] (state, data) {
    state.editorElement = data
  },
  [types.ADD_PIC_ELEMENT] (state, data) {
    console.log(data)
    console.log(state.editorPage.elements)
    state.editorPage.elements.push(data)
    console.log(state.editorPage)
  },
  [types.PLAY_ANIMATE] (state, data) {
    // 如存在选择元素，则播放选择元素动画，否则全部元素播放
    var elements = state.editorPage.elements
    if (state.editorElement) {
      elements.find((value, index, arr) => {
        if (value === state.editorElement) {
          if (value.playing) {
            value.playing = false
            setTimeout(() => {
              value.playing = true
            }, 100)
          } else {
            value.playing = true
          }
        }
      })
    } else {
      for (var element of elements) {
        element.playing = true
      }
    }
  },
  [types.ADD_PAGE] (state, page) {
    state.editorTheme.pages.push(page)
  },
  [types.DELETE_PAGE] (state, data) {
    state.editorTheme.pages.findIndex((value, index, arr) => {
      if (value === data) {
        state.editorTheme.pages.splice(index, 1)
      }
    })
  },
  [types.SET_CUR_EDITOR_PAGE] (state, data) {
    state.editorPage = data
  },
  [types.GET_USER_THEME_LIST] (state, data) {
    state.themeList = data
  },
  [types.SET_CUR_EDITOR_THEME] (state, data) {
    state.editorTheme = data
  },
  [types.DELETE_ELEMENT] (state, data) {
    state.editorPage.elements.findIndex((value, index, arr) => {
      if (value === data) {
        state.editorPage.elements.splice(index, 1)
      }
    })
  },
  [types.CREATE_THEME] (state, data) {
    state.themeList.push(data)
  },
  [types.ADD_THEME_SUCCESS] (state, data) {
    state.editorTheme._id = data._id
  },
  [types.UPDATE_THEME_SUCCESS] (state, data) {
    console.log('成功！！！！！')
  },
  [types.SAVE_PIC] (state, data) {
    state.editorElement.imgSrc = app.APP_MALL_API_URL + data.filePath
  },
  [types.GET_PAGE_THEMEID] (state, data) {
    state.editorPage = data
  }
}
export default mutations
