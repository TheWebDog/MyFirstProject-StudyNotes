import { CHANGE_FILTER } from './type'
export default {
  changeFilter: function (context, filter) {
    context.commit(CHANGE_FILTER, filter)
  },
}
