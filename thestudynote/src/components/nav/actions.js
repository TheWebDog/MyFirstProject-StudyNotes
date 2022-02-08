import { CHANGE_CLOSEOROPEN } from './type'
export default {
  changeCloseORopen: function (context) {
    context.commit(CHANGE_CLOSEOROPEN)
  },
}