// company setup interface
import request from '@/utils/request'
// read the role list data
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
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
