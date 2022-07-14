// company setup interface
import request from '@/utils/request'
// read the role list data
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// get company information
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
// deleting a role
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// edit role
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// obtaining role details
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// new role functions
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// assign rights to roles
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
