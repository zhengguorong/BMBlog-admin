/**
 * Created by zhengguorong on 2016/11/30.
 */
import * as http from '../util/http'

const getUserThemeList = (cb) => {
  http.get('/api/pages')
    .then(res => {
      cb(res)
    })
}

const saveTheme = (theme, cb) => {
  http.post('/api/pages', theme)
    .then(res => {
      cb(res)
    })
}

const updateTheme = (theme, cb) => {
  http.put('/api/pages/' + theme._id, theme)
    .then(res => {
      cb(res)
    })
}

module.exports = {
  getUserThemeList, saveTheme, updateTheme
}
