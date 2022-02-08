import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import Thefilter from './views/Thefilter.vue'

const filterStore = {
  state,
  getters,
  actions,
  mutations,
}

export { filterStore, Thefilter }
