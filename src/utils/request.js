import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from './auth'
import router from '@/router'

const timeout = 2400

const service = axios.create({
  // 设置axios请求基础地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 定义超时响应
  timeout: 500000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeout()) {
      // 如果超时了做三件事情
      // 1. 退出删除数据
      store.dispatch('user/logout')
      // 2. 跳到登录页
      router.push('/login')
      // 3. 返回一个错误
      return Promise.reject(new Error('登录超时'))
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`
      // config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
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
  console.dir(err)
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  Message.error(err.message)
  return Promise.reject(err.message)
})

export default service

function isCheckTimeout(params) {
  const now = Date.now()
  const savedTime = getTimeStamp()
  console.log(now)
  console.log(savedTime)
  return (now - savedTime) / 1000 >= timeout
}

