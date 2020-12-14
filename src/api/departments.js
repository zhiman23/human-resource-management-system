import request from '@/utils/request'

export const getDepartments = function() {
  return request({
    url: '/company/department'
  })
}
export function delDepdartments(id) {
  return request({
    url: '/company/department' + id,
    method: 'delete'
  })
}

export function addDepartments(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}
