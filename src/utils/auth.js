import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const timeKey = 'hrsaas-timestamp-key'// 时间戳

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}

export function convertTreeData(list, pid) {
  const res = []
  list.forEach(item => {
    if (item.pid === pid) {
      const children = convertTreeData(list, item.id)
      if (children.length > 0) {
        item.children = children
      }
      res.push(item)
    }
  })
  return res
}
