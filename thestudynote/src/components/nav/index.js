// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Nav from './views/Nav.vue'

// 整合navStore
const navStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { navStore, Nav };