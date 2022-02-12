// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import PageView from './views/PageView.vue'

// 整合navStore
const pageViewStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { pageViewStore, PageView };