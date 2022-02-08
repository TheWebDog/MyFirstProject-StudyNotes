<template>
  <div class="Home">
    <div class="thehead">
      <Nav></Nav>
    </div>
    <div class="message">信息区</div>
    <div class="show">
      <div class="showhead">
        <Thefilter></Thefilter>
        <Search></Search>
        <AddBtn></AddBtn>
      </div>
      <List></List>
    </div>

    <div class="background">
      <div class="square">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="circle">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Nav } from './nav/index'
import { AddBtn } from './addBtn/index'
import { Thefilter } from './thefilter/index'
import { Search } from './search/index'
import { List } from './list/index'
export default {
  name: 'Home',
  components: {
    Nav,
    AddBtn,
    Thefilter,
    Search,
    List,
  }
}
</script>
