import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
// defining the timeout
const TimeOut = 36000
// create an axios instance
const service = axios.create({
  // axios requests the underlying address
  baseURL: process.env.VUE_APP_BASE_API,
  // request time out
  timeout: 5000
})
// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    console.log(store.getters.token)
    // if the timeout
    if (IsCheckTimeOut()) {
      // log out
      store.dispatch('user/logout')
      // jump to the login page
      // routing programmatic navigation
      router.push('/login')
      // return error message
      return Promise.reject(new Error('token超时了'))
    }
    // if there is a token,inject the token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // config.headers['Authorization'] = `Bearer ${store.getters.token}`
  return config
}, error => {
  return Promise.reject(error)
}
)
// response interceptor
service.interceptors.response.use(response => {
  // deconstructing responense data
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // failure return an error message
  Message.error(error.message)
  return Promise.reject(error)
}
)
// if the timeout
// timeout logic :(current time - time in the cache)whether it is greater then the difference
function IsCheckTimeOut() {
  // current timestamp
  const currentTime = Date.now()
  // cache timestamp
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}
// export the axios instance
export default service
