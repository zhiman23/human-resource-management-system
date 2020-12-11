import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    // 修改 token 的 mutations
    setToken(state, data) {
      // 1. 将传入的 token 放到 vuex state(方便使用, 但是不能持久化)
      state.token = data
      // 2. 引入了 utils 里面的小工具, 用来将token同时存放到 cookie (不方便使用, 但是可以持久化)
      setToken(data)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 'login': function() {
    login(context, data) {
      return login(data).then(data => {
        Message.success('登录成功')
        context.commit('setToken', data)
        setTimeStamp()
      })
    },
    // 发请求
    // getUserInfo 是个对象，所以括起来,async await
    'getUserInfo': async(context) => {
      // 发请求,
      const dataUserInfo = await getUserInfo()
      const dataUserDetail = await getUserDetailById(dataUserInfo.userId)
      const userInfo = {
        ...dataUserInfo,
        ...dataUserDetail
      }
      context.commit('setUserInfo', userInfo)
    },
    logout(context) {
      const { commit } = context
      commit('removeToken')
      commit('removeUserInfo')
    }

  }
}

