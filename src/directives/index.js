
// handle picture anomalies
export const imageerror = {
  inserted(dom, options) {
    dom.src = dom.src || options.value
    dom.onerror = function() {
      // when the picture is abnormal,the defaule picture of the command configuration will be set to the picture content
      dom.src = options.value
    }
  },
  componentUpdated (dom, options) {
    dom.src = dom.src || options.value
  }
}
