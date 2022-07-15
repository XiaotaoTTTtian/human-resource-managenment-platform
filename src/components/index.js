// global identical registration
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import LangSelect from './lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    // registration tool component
    Vue.component('PageTools', PageTools)
    // registration excel component
    Vue.component('UploadExcel', UploadExcel)
    // register the import upload component
    Vue.component('ImageUpload', ImageUpload)
    // introduce full-screen components
    Vue.component('ScreenFull', ScreenFull)
    // dynamic theme component
    Vue.component('ThemePicker', ThemePicker)
    // multilinggual component
    Vue.component('LangSelect', LangSelect)
    // tab page view introduction
    Vue.component('TagsView', TagsView)
    // register print component
    Vue.use(Print)
  }
}
