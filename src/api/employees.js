import request from '@/utils/request'
// get a simple list of employees
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
