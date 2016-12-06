import api from '../../api/user'

export const login = ({commit}, userInfo) => {
  api.login(userInfo).then((res) => {
    window.localStorage.setItem('token', res.token)
    window.location.href = '#/themeList'
  })
    .catch(res => {
      if (res.response.status === 401) {
        commit('LOGIN_FAILURE', '用户名或密码错误')
      }
    })
}

export const register = ({commit}, userInfo) => {
  api.register(userInfo)
    .then((res) => {
      window.localStorage.setItem('token', res.token)
      window.location.href = '#/editor'
    })
    .catch(res => {
      if (res.response.status === 401) {
        commit('REGISTER_FAILURE', '用户名或密码错误')
      }
    })
}
