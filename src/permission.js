// import route instances
import router from '@/router'
// import vuex instances
import store from '@/store'
// progress bar plug-in
import nProgress from 'nprogress'
// progress bar style
import 'nprogress/nprogress.css'
// all pages that are not controlled by permissions
// white list
const whiteList = ['/login', '/404']
// front route guard
router.beforeEach(async function(to, from, next) {
  // enable the progress bar
  nProgress.start()
  // is there a token
  if (store.getters.token) {
    // check whether vuex has a user ID
    if (!store.getters.userId) {
      // obtaining user information
      await store.dispatch('user/getUserInfo')
    }
    // is it on the login page
    if (to.path === '/login') {
      // jump to home page
      next('/')
    } else {
      // permit through
      next()
    }
  } else {
    // there is no token
    if (whiteList.indexOf(to.path) > -1) {
      // if you enter here,you're in the whotelist
      next()
    } else {
      // jump to login page
      next('/login')
    }
  }
  // manually forced shutdown
  nProgress.done()
})
// rear route guard
router.afterEach(function() {
  // close the progress bar
  nProgress.done()
})
