// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Message from './views/Message.vue'

// 整合navStore
const messageStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { messageStore, Message };