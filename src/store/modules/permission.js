// vuex permissions module
import { constantRoutes, asyncRoutes } from '@/router'
// the permission module in vuex is used to store the current static route + the current user permission route
const state = {
  // all users have static routes by default
  routes: constantRoutes
}
const mutations = {
  // newRouter -- the user logs in to the part of the dynamic route obtained by permission
  setRoutes(state, newRouter) {
    state.routes = [...constantRoutes, ...newRouter]
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    // select dynamic route and menus can be on the route
    menus.forEach(key => {
      // filter the routes that match the conditions
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    // submit the eligible dynamic routing to mutations
    context.commit('setRoutes', routes)
    // for routing addRoutes
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
