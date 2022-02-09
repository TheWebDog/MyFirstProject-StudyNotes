import { marked } from 'marked'

export default {
  getTittle: function (state) {
    return state.tittle
  },
  getContext: function (state) {
    return state.context
  },
  getHtml: function (state) {
    return marked.parse(state.context)
  },
}
