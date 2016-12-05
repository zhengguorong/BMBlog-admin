import mutations from './mutations'
import * as actions from './actions'

const state = {
  loginResult: {isSuccess: true, msg: ''}
}

export default{
  state,
  actions,
  mutations
}
