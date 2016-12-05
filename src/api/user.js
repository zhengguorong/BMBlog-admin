import * as http from '../util/http'

const login = (cb) => {
  http.post('/auth/login')
    .then((res) => {
      cb(res)
    })
}

module.exports = {
  login
}
