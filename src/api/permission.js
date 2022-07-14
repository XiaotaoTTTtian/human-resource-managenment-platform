import request from '@/utils/request'
// access permission
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}
// additional permissions
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// update permissions
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
// delete permissions
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
// obtaining permission details
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
