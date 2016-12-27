/**
 * Created by zhengguorong on 2016/11/30.
 */
import * as http from '../util/http'

const getUserThemeList = () => {
  return http.get('/api/pages')
}
const getPageByThemeId = (id) => {
  return http.get('/api/pages/' + id)
}
const saveTheme = (theme) => {
  return http.post('/api/pages', theme)
}

const updateTheme = (theme) => {
  return http.put('/api/pages/' + theme._id, theme)
}

const uploadPic = (data) => {
  return http.post('/api/upload', data)
}

const getPicListByThemeId = (_id) => {
  return http.get('api/upload/theme/' + _id)
}
module.exports = {
  getUserThemeList, saveTheme, updateTheme, uploadPic, getPageByThemeId, getPicListByThemeId
}
