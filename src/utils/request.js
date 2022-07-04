import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  // axios requests the underlying address
  baseURL: process.env.VUE_APP_BASE_API,
  // request time out
  timeout: 5000
})
// request interceptor
service.interceptors.request.use()
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
// export the axios instance
export default service
