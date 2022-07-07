import request from '@/utils/request'
// obtain organizational architecture data
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// delete a department based on its ID
export function deleteDepartmentById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// the new department
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
