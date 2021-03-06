import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
import i18n from '@/i18n'

Vue.use(ElementUI, {
  // i18n 是一个属性, 可以传入一个函数, 自动获取到当前饿了么想要翻译的key
  // 只需要在这个函数中返回, 对应的文字即可
  i18n: (key) => i18n.t(key)
})

import { imageerror } from '@/directives'
Vue.directive('imageerror', imageerror)

// 封装全局组件
import Components from '@/components'
Vue.use(Components)

import Print from 'vue-print-nb'
Vue.use(Print)

Vue.config.productionTip = false

// 资源过滤器
import * as filters from '@/filters'
for (var key in filters) {
  const filterName = key
  const filterFunction = filters[key]
  Vue.filter(filterName, filterFunction)
}

// 全局混入
import { checkPermissionMixin } from '@/mixin'
Vue.mixin(checkPermissionMixin)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
