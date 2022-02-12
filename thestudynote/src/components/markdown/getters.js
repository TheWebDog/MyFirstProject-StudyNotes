import { marked } from 'marked'

export default {
  getTitle: function (state) {
    return state.title
  },
  getContext: function (state) {
    return state.context
  },
  getHtml: function (state) {
    return marked.parse(state.context)
  },
}
