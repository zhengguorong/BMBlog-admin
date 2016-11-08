import vue from 'vue'

export const get = (url, query) => {
  const token = 'Bearer ' + window.localStorage.token
  let _url
  if (query) {
    _url = `http://localhost:3000${url}?${query}`
  } else {
    _url = `http://localhost:3000${url}`
  }
  return vue.http.get(_url, {
    headers: { authorization: token }
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.data
    }
    return Promise.reject(new Error(res.status))
  })
}

export const post = (url, query) => {
  const token = 'Bearer ' + window.localStorage.token
  let _url = `http://localhost:3000${url}`
  return vue.http.post(_url, query, {
    headers: { authorization: token }
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.data
    }
    return Promise.reject(new Error(res.status))
  })
}
