import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// state
const state = {
  // example set the initial token information
  token: getToken()
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
  }
}
// execute asynchronous
const actions = {
  async login(context, data) {
    const result = await login(data)
    // the result is actually the token after the response interceptor processing
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
