import { CHANGE_CLOSEOROPEN } from './type'
export default {
  [CHANGE_CLOSEOROPEN]: function (state) {
    state.closeORopen=!state.closeORopen
  },
}