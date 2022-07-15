import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import elementEN from 'element-ui/lib/locale/lang/en'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import customZH from './zh' // introduce custom chinese package
import customEN from './en'
// global registration internationalization package
Vue.use(VueI18n)
export default new VueI18n({
  // if the language type cannot be obtained from cookie,it is chinese
  locale: Cookie.get('language') || 'zh',
  messages: {
    // the introduce of english
    en: {
      ...elementEN,
      customEN
    },
    // the introduction of chinese
    zh: {
      ...elementZH,
      customZH
    }
  }
})
