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

// 保存员工的基本信息
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// 读取员工的基本信息
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// 更新用户详情的基础信息
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取员工岗位信息
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存员工岗位信息
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 给用户分配角色
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
