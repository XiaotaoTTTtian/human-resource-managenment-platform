import request from '@/utils/request'
// get a simple list of employees
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// get comprehensive list data of employees
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// deleting an employee interface
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// the new employee
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
// batch import of employees
export function importEmployeee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
// save basic employee information
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
