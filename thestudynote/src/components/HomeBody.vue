<template>
  <div>
    <div class="Home_body">
      <div class="message">
        <Message></Message>
      </div>
      <div class="show">
        <div class="showhead">
          <Thefilter></Thefilter>
          <Search></Search>
          <AddBtn></AddBtn>
        </div>
        <div class="list">
          <List></List>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { AddBtn } from './addBtn/index'
import { Thefilter } from './thefilter/index'
import { Search } from './search/index'
import { List } from './list/index'
import { Message } from './message/index'
export default {
  name: 'HomeBody',
  components: {
    AddBtn,
    Thefilter,
    Search,
    List,
    Message,
  },
  methods: {
    ...mapActions(['geHotList']),
  },
  created () {
    // console.log('this.$route.fullPath')
    this.geHotList()
  },
}
</script>