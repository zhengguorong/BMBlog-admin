import * as http from '../util/http'

const login = (userInfo) => {
  return http.post('/auth/login', userInfo)
}

module.exports = {
  login
}
