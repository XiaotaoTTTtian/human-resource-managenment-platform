import request from '@/utils/request'

export function login(data) {
  // sending a login request
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// obtaining user information
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// access to image
export function getUserPhotoById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
