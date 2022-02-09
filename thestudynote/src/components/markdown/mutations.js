import { GET_ETXTAREA, GET_VALUE } from './type'
// import {marked} from 'marked'

export default {
  [GET_VALUE]: function (state, input) {
    state.tittle = input
  },
  [GET_ETXTAREA]: function (state, textarea) {
    state.context = textarea
  },
}
