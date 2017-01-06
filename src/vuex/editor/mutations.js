import * as types from './mutation-type'
import * as app from '../../util/appConst'
import Element from '../../model/Element'

const mutations = {
  [types.SET_CUR_EDITOR_ELEMENT] (state, data) {
    state.editorElement = data
  },
  [types.ADD_PIC_ELEMENT] (state, data) {
    state.editorPage.elements.push(new Element(data))
  },
  [types.SET_BG_ELEMENT] (state, data) {
    let haveBG = false
    state.editorPage.elements.findIndex((value, index, arr) => {
      if (value.type === 'bg') {
        haveBG = true
        value.imgSrc = data.imgSrc
        value.width = data.width
        value.height = data.height
      }
    })
    if (!haveBG) {
      state.editorPage.elements.push(new Element(data))
    }
  },
  [types.PLAY_ANIMATE] (state, data) {
    // 如存在选择元素，则播放选择元素动画，否则全部元素播放
    var elements = state.editorPage.elements
    if (state.editorElement && state.editorElement.type) {
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
      elements.find((value, index, arr) => {
        if (value.type !== 'bg') {
          value.playing = false
          setTimeout(() => {
            value.playing = true
          }, 100)
        }
      })
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
        state.editorElement = null
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
  },
  [types.CLEAN_BG] (state) {
    state.editorPage.elements.findIndex((value, index, arr) => {
      if (value && value.type === 'bg') {
        state.editorPage.elements.splice(index, 1)
      }
    })
  },
  [types.CLEAN_ELE] (state, ele) {
    state.editorPage.elements.splice(state.editorPage.elements.indexOf(ele), 1)
  },
  [types.FETCH_PIC_LIST] (state, picList) {
    state.picList = picList
  },
  [types.PUSH_PIC_LIST] (state, ele) {
    state.picList.push(ele)
  },
  [types.CLEAN_PIC_LIST] (state) {
    state.picList = []
  },
  [types.SORTELEMENTS] (state, data) {
    let element = state.editorPage.elements[data.start]
    let end = parseInt(data.end)
    if (end !== -1) {
      state.editorPage.elements.splice(data.start, 1)
      if (end >= state.editorPage.elements.length) {
        state.editorPage.elements.push(element)
      } else {
        state.editorPage.elements.splice(end, 0, element)
      }
      state.editorPage.elements.map((value, index, arr) => {
        value.zindex = index + 1
      })
    }
  },
  [types.DELETE_THEME] (state, data) {
    state.themeList.findIndex((value, index, arr) => {
      if (value === data) {
        state.themeList.splice(index, 1)
      }
    })
  }
}
export default mutations
