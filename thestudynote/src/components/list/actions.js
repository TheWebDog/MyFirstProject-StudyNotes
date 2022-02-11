import { GET_LISTS } from './type'
export default {
  geClassifyList: function (context,classifyId) {
    context.commit(GET_LISTS,classifyId)
  },
}