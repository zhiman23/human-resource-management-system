export const imageerror = {
  inserted(dom, options) {
    // 额外添加逻辑处理src为空的状况
    dom.src = dom.src || options.value
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
