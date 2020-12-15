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

// 根据ID删除角色
export function delRole(roleId) {
  return request({
    url: '/sys/role/' + roleId,
    method: 'delete'
  })
}

// 根据ID获取角色
export function getRoleDetail(id) {
  return request({
    url: '/sys/role/' + id
  })
}

// 根据ID更新角色
export function updateRole(data) {
  return request({
    method: 'put',
    url: '/sys/role/' + data.id,
    data
  })
}

// 添加角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
