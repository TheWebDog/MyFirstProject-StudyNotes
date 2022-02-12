import { GET_PAGE } from './type'
export default {
  getPage: function (context,{classify,title}) {
    context.commit(GET_PAGE,{classify,title})
  },
}