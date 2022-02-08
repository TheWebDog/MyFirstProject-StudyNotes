import { CHANGE_FILTER } from './type'
export default {
  [CHANGE_FILTER]: function (state, filter) {
    state.filter = filter
  },
}
