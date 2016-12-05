import axios from 'axios'

export const get = (url, query) => {
  const token = 'Bearer ' + window.localStorage.token
  let _url
  if (query) {
    _url = `http://localhost:3000${url}?${query}`
  } else {
    _url = `http://localhost:3000${url}`
  }
  return axios.get(_url, {
    headers: { authorization: token }
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.data
    }
    return Promise.reject(new Error(res.status))
  })
    .catch((err) => {
      if (err.status === 401) {
        console.log('token过期，重新登录！！')
        window.location.href = '#/login'
      }
    })
}

export const post = (url, query) => {
  const token = 'Bearer ' + window.localStorage.token
  let _url = `http://localhost:3000${url}`
  return axios.post(_url, query, {
    headers: { authorization: token }
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.data
    }
    return Promise.reject(new Error(res.status))
  })
    .catch((err) => {
      if (err.status === 401) {
        console.log('token过期，重新登录！！')
        window.location.href = '#/login'
      }
    })
}

export const put = (url, query) => {
  const token = 'Bearer ' + window.localStorage.token
  let _url = `http://localhost:3000${url}`
  return axios.put(_url, query, {
    headers: { authorization: token }
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
    .catch((err) => {
      if (err.status === 401) {
        console.log('token过期，重新登录！！')
        window.location.href = '#/login'
      }
    })
}

export const patch = (url, query) => {
  const token = 'Bearer ' + window.localStorage.token
  let _url = `http://localhost:3000${url}`
  return axios.patch(_url, query, {
    headers: { authorization: token }
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
    .catch((err) => {
      if (err.status === 401) {
        console.log('token过期，重新登录！！')
        window.location.href = '#/login'
      }
    })
}

export const del = (url, article) => {
  const token = 'Bearer ' + window.localStorage.token
  let _url = `http://localhost:3000${url}/${article._id}`
  return axios.delete(_url, {
    headers: { authorization: token }
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    })
    .catch((err) => {
      if (err.status === 401) {
        console.log('token过期，重新登录！！')
        window.location.href = '#/login'
      }
    })
}
