import { GET_HOT_LISTS,GET_CLASSIFY_LISTS,GET_SEARCH_LIST} from './type'
export default {
  geClassifyList: function (context,classifyId) {
    context.commit(GET_CLASSIFY_LISTS,classifyId)
  },
  geHotList: function (context) {
    context.commit(GET_HOT_LISTS)
  },
  geSearchList: function (context,searchWhat) {
    context.commit(GET_SEARCH_LIST,searchWhat)
  },
}