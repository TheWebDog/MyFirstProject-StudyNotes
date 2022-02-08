import { CHANGE_SEARCH_VALUE } from './type'

export default {
  change_searchValue: function (context, value) {
    context.commit(CHANGE_SEARCH_VALUE, value)
  },
}
