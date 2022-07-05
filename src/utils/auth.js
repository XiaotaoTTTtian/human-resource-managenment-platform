import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
// set a unique key
const timeKey = 'hrsaas-timestamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// get timestamp
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// set timestamp
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
