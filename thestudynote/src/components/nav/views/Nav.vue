<template>
  <div class="nav_div">
    <div class="tittle">
      <h1 class="hello welcome" contenteditable="true">欢迎来到</h1>
      <h1 class="hello master" contenteditable="true">TheWebDog的md笔记</h1>
    </div>

    <div class="nav_content">
      <div class="homePage">首页</div>
      <div class="dropdown">
        <button class="dropbtn">分类</button>
        <ul class="dropdown-content">
          <li
            class="option"
            v-for="(item, index) in getClassifyList"
            v-bind:key="index"
          >
          {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <!-- <ul
      class="nav_ul"
      :class="{ nav_ulClosed: getCloseORopen }"
    >
      <li
        class="nav_li"
        v-for="(item, index) in getClassifyList"
        v-bind:key="index"
      >
        {{ item }}
      </li>
    </ul>
    <div class="btn" @click="closeORopen">≡</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Nav",
  computed: {
    ...mapGetters(['getClassifyList']),
  },
  methods: {

  },
}



</script>


<style>
</style>