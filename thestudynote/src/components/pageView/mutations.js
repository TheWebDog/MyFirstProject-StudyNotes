import axios from 'axios'
import { marked } from 'marked'
import { GET_PAGE } from './type'
export default {
  [GET_PAGE]: function (state,{classify,title}) {
    axios
      .post('http://localhost:3090/getPage',{classify,title})
      .then((res) => {
        state.page = marked.parse(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
