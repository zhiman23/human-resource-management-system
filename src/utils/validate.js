/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validMobile(data) {
  const pattern = /^1[3-9]\d{9}$/
  return pattern.test(data)
} 

// 创建一个密码校验规则
export function validPassword(data) {
  return data.length >= 6 && data.length <= 16
}
