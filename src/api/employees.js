import request from '@/utils/request'

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

export function getUserList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工功能
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 添加员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 导入员工
export function importEmployees(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
