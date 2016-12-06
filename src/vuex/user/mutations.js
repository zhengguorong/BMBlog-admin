import * as types from './mutation-type'

const mutations = {
  [types.LOGIN_SUCCESS] (state, data) {
  },
  [types.LOGIN_FAILURE] (state, data) {
    state.errorInfo = data
  },
  [types.REGISTER_FAILURE] (state, data) {
    state.errorInfo = data
  }
}

export default mutations
