<template>
  <div class="nav_div">
    <div class="tittle">
      <h1 class="hello welcome" contenteditable="true">欢迎来到</h1>
      <h1 class="hello master" contenteditable="true">TheWebDog的md笔记</h1>
    </div>

    <div class="nav_content">
      <div class="homePage" @click="goHome()">首页</div>
      <div class="dropdown">
        <button class="dropbtn">分类</button>
        <ul class="dropdown-content">
          <li
            class="option"
            v-for="(item, index) in getClassifyList"
            v-bind:key="index"
            @click="goToTheClassify(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Nav",
  computed: {
    ...mapGetters(['getClassifyList']),
  },
  methods: {
    ...mapActions(['getNav']),
    goToTheClassify (classify) {
      if (this.$route.params.classifyId != classify) {
        this.$router.replace(`/${classify}`)
      }
    },
    goHome () {
      this.$router.replace(`/`)
    },
  },
  created () {
    this.getNav()
  },
}
</script>


<style>
</style>