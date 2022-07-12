// global identical registration
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
export default {
  install(Vue) {
    // registration tool component
    Vue.component('PageTools', PageTools)
    // registration excel component
    Vue.component('UploadExcel', UploadExcel)
    // register the import upload component
    Vue.component('ImageUpload', ImageUpload)
    // register print component
    Vue.use(Print)
  }
}
