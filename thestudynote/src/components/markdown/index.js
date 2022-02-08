// 引入
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import Markdown from './views/Markdown'

// 整合searchStore
const markdownStore = {
  state,
  getters,
  actions,
  mutations,
}

// 导出
export { markdownStore, Markdown }
