// 创建Vue.use 注册组件
import PageTools from '@/components/PageTools'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
  }
}
