<template>
  <div>
    <div class="classify_container">
      <ul class="classify_list">
        <li  class="classify_li"></li>
      </ul>
    </div>
    <div class="lists">
      <List></List>
    </div>
  </div>
</template>

<script>
import {List} from '../list/index'
export default {
  name:'ClassifyPage',
  components:{
    List,
  },
}
</script>