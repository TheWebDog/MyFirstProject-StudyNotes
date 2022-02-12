<template>
  <div>
    <div class="pageView">
      <div class="markdown-body .markdown-here-wrapper" v-highlight v-html="sendHtml"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "PageView",
  computed: {
    ...mapGetters(['sendHtml']),
  },
  methods: {
    ...mapActions(['getPage']),
    handle () {
      console.log(this.$route.params)
    }
  },
  created () {
    var {classify , title} = this.$route.params
    this.getPage({classify , title})
  },
}
</script>


<style>
</style>