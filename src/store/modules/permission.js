import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: []
}

const mutations = {
  setRoutes(state, data) {
    state.routes = [...constantRoutes, ...data]
  }
}

const actions = {
  filterRoutes(context, menus) {
    const myRoutes = asyncRoutes.filter(item => menus.indexOf(item.name) > -1)
    // 在所有路由都添加完毕以后, 动态增加一个 404 重定向, 保证所有其他地址, 都是 404
    myRoutes.push({ path: '*', redirect: '/404', hidden: true })
    // 调用 mutattion 处理筛选后的动态路由
    // 负责菜单权限
    context.commit('setRoutes', asyncRoutes)
    // 负责往外输出供路由守卫使用, 决定页面查看权限
    return asyncRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
