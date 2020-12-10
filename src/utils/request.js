import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import serveStatic from 'serve-static'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
})
// 响应拦截器
service.interceptors.response.use(res => {
  console.log(res.data)
  const { message, success, data } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  Message.error(err.message)
  return Promise.reject(err.message)
})

export default service
