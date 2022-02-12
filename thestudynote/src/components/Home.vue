<template>
  <div class="Home">

    <div class="thehead">
      <Nav></Nav>
    </div>

    <router-view class="the_body"></router-view>

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

export default {
  name: 'Home',
  components: {
    Nav,
  }
}
</script>
