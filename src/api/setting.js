import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 根据ID查询企业
export function getCompanyDetail(campanyId) {
  return request({
    url: '/company/' + campanyId
  })
}
