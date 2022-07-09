// global identical registration
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
export default {
  install(Vue) {
    // registration tool component
    Vue.component('PageTools', PageTools)
    // registration excel component
    Vue.component('UploadExcel', UploadExcel)
  }
}
