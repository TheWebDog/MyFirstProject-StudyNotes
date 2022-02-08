// 引入
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import Search from './views/Search.vue'

// 整合searchStore
const searchStore = {
  state,
  getters,
  actions,
  mutations,
}

// 导出
export { searchStore, Search }
