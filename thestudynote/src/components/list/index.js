import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import List from './views/List.vue'

const listStore = {
  state,
  getters,
  actions,
  mutations,
}

export { listStore, List }
