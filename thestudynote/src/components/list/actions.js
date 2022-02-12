import { GET_HOT_LISTS,GET_CLASSIFY_LISTS,GET_SEARCH_LIST,GET_LISTS} from './type'
export default {
  geClassifyList: function (context,classify) {
    context.commit(GET_CLASSIFY_LISTS,classify)
  },
  geHotList: function (context) {
    context.commit(GET_HOT_LISTS)
  },
  geSearchList: function (context,searchWhat) {
    context.commit(GET_SEARCH_LIST,searchWhat)
  },
  getRouterList: function (context,routerandlist) {
    context.commit(GET_LISTS,routerandlist)
  },
}