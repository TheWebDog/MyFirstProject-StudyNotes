import { CHANGE_SEARCH_VALUE } from './type'

export default {
  [CHANGE_SEARCH_VALUE]: function (state, value) {
    // console.log(value)
    state.searchValue = value
  },
}
