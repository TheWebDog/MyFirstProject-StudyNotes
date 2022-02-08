<template>
  <div class="nav_div">
    <div class="tittle">
      <h1 class="hello welcome" contenteditable="true">欢迎来到</h1>
      <h1 class="hello master" contenteditable="true">TheWebDog的笔记</h1>
    </div>

    <ul
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
    <div class="btn" @click="closeORopen">≡</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Nav",
  computed: {
    ...mapGetters(['getClassifyList', 'getCloseORopen']),
  },
  // created(){
  //   console.log('注:此条为created生命周期中的测试文本-----')
  //   console.log(this.$store)
  //   console.log('---------------------------------------')
  // },
  methods: {
    ...mapActions(["changeCloseORopen"]),
    closeORopen: function () {
      this.changeCloseORopen();
    },
  },
}



</script>


<style>
</style>