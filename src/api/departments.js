import request from '@/utils/request'
// obtain organizational architecture data
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
