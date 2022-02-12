import { GET_HOT_LISTS,GET_CLASSIFY_LISTS,GET_SEARCH_LIST} from './type'
import axios from 'axios'
export default {
  [GET_HOT_LISTS]: function (state) {
    axios
    .get('http://localhost:3090/getHot')
    .then((res) => {
      state.List = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  [GET_CLASSIFY_LISTS]: function (state,classifyId) {
    axios
    .post('http://localhost:3090/getList', { classifyId })
    .then((res) => {
      state.List = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  [GET_SEARCH_LIST]: function (state, searchWhat) {
    axios
    .post('http://localhost:3090/search', { searchWhat })
      .then((res) => {
      state.List = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
}
