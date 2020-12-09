import { setToken,getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Message } from 'element-ui'


export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    // 修改 token 的 mutations
    setToken(state, data) {
      // 1. 将传入的 token 放到 vuex state(方便使用, 但是不能持久化)
      state.token = data
      // 2. 引入了 utils 里面的小工具, 用来将token同时存放到 cookie (不方便使用, 但是可以持久化)
      setToken(data)
    }
  },
  actions: {
    // 'login': function() {
    login(context, data) {
      login(data).then(res => {
        const { data, message, success } = res.data
        if (success) {
          // 1. 弹窗
          Message.success(message)
          // 2. 调用 mutations
          context.commit('setToken', data)
        }
      })
    }
  }
}

