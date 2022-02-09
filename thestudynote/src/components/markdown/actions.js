import { GET_ETXTAREA,GET_VALUE } from './type'

export default {
  get_input: function (context, input) {
    context.commit(GET_VALUE,input)
  },
  get_textarea: function (context, textarea) {
    context.commit(GET_ETXTAREA,textarea)
  },
}
