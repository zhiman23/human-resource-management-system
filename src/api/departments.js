import request from '@/utils/request'

export const getDepartments = function() {
  return request({
    url: '/company/department'
  })
}
