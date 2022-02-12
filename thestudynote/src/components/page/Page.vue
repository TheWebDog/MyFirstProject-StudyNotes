<template>
  <div>
    <div class="page">
      <PageView></PageView>
    </div>
  </div>
</template>

<script>
import { PageView } from '../pageView/index';
export default {
  name: "Page",
  components: {
    PageView,
  },
  methods: {
    // handle () {
    //   console.log(this.$route.params)
    // }
  },
  // created () {
  //   // this.handle()
  // }
}
</script>

<style>
</style>