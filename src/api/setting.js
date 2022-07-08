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
// new role functions
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
