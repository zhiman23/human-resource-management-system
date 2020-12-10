import request from '@/utils/request'

// import axios from '@/utils/request'
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getUserInfo(token) {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

export function logout() {

}
