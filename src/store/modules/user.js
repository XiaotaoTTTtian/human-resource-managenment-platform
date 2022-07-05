import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserPhotoById } from '@/api/user'
// state
const state = {
  // example set the initial token information
  token: getToken(),
  // user information
  userInfo: {}
}
// modify the state
const mutations = {
  // set token
  setToken(state, token) {
    // set token
    state.token = token
    // cache data
    setToken(token)
  },
  removeToken(state) {
    // delete vuex token
    state.token = null
    // clear cache
    removeToken()
  },
  // set user information
  setUserInfo(state, result) {
    state.userInfo = result
  },
  // delete user information
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// execute asynchronous
const actions = {
  // register
  async login(context, data) {
    const result = await login(data)
    // the result is actually the token after the response interceptor processing
    context.commit('setToken', result)
  },
  // obtaining user information
  async getUserInfo (context) {
    // obtain basic user information
    const result = await getUserInfo()
    // obtain user photo
    const baseInfo = await getUserPhotoById(result.userId)
    // data merge
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return baseResult
  },
  // log out
  logout(context) {
    // delete token
    context.commit('removeToken')
    // delete user information
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
