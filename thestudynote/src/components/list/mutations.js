import {
  GET_HOT_LISTS,
  GET_CLASSIFY_LISTS,
  GET_SEARCH_LIST,
  GET_LISTS,
} from './type'
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
  [GET_CLASSIFY_LISTS]: function (state, classify) {
    axios
      .post('http://localhost:3090/getList', { classify })
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
  // 状态补充 防止在其他页面刷新后list丢失
  [GET_LISTS]: function (state, routerandlist) {
    var { classify, thelist } = routerandlist
    if (thelist.length == 0) {
      switch (classify) {
        case '/':
          axios
          .get('http://localhost:3090/getHot')
          .then((res) => {
            state.List = res.data
          })
          .catch((err) => {
            console.log(err)
          })
          break
        default:
          axios
          .post('http://localhost:3090/getList', { classify })
          .then((res) => {
            state.List = res.data
          })
          .catch((err) => {
            console.log(err)
          })
          break
      }
    }
  },
}
