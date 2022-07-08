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
// adding a new department
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// query department details by ID
export function getDepartmentById(id) {
  return request({
    url: `/company/department/${id}`
  })
}
