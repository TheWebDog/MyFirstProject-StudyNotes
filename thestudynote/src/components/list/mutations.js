import { GET_LISTS } from './type'
import axios from 'axios'
export default {
  [GET_LISTS]: function (state, classifyId) {
    if (classifyId === '/') {
      axios
      .get('http://localhost:3090/getHot')
        .then((res) => {
        // console.log(res.data,'-------hot')
        state.List = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      axios
      .post('http://localhost:3090/getList',{classifyId})
        .then((res) => {
          // console.log(res.data,'-------list')
        state.List = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
}