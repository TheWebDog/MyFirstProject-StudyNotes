<template>
  <div class="page">page</div>
</template>

<script>
export default {
  name: "Page",
  components: {

  },
  methods: {
    handle () {
      console.log(this.$route)
    }
  },
  created () {
    this.handle()
  }
}
</script>

<style>
</style>