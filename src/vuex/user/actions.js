import api from '../../api/user'

export const login = ({commit}, userInfo) => {
  api.login(userInfo).then((res) => {
    commit('SET_ERROR_INFO', '')
    window.localStorage.setItem('token', res.token)
    window.location.href = '#/themeList'
  })
    .catch(res => {
      if (res.response.status === 401) {
        commit('SET_ERROR_INFO', '用户名或密码错误')
      }
    })
}
