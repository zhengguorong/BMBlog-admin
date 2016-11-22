import * as types from './mutation-type'

const mutations = {
  [types.SET_CUR_EDITOR_ELEMENT] (state, data) {
    state.curElement = data
  },
  [types.ADD_PIC_ELEMENT] (state, data) {
    state.curElement = data
    state.pageElement.push(data)
  },
  [types.PLAY_ANIMATE] (state, data) {
    // 如存在选择元素，则播放选择元素动画，否则全部元素播放
    if (state.curElement) {
      state.pageElement.find((value, index, arr) => {
        if (value === state.curElement) {
          value.playing = true
        }
      })
    } else {
      for (var element of state.pageElement) {
        element.playing = true
      }
    }
  }
}
export default mutations
