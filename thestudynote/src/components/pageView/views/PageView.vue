<template>
  <div>
    <div class="page_tittle">
      <h2 class="page_tittle_h1">
        {{ $route.params.title }}
      </h2>
      <div class="go_back_page" @click="goBack">×</div>
    </div>

    <div class="pageView">
      <div
        class="markdown-body .markdown-here-wrapper"
        v-highlight
        v-html="sendHtml"
      ></div>
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
    ...mapActions(['getPage','geClassifyList']),
    // handle () {
    //   console.log(this.$route.params)
    // },
    goBack () {
      this.$router.back()
      this.geClassifyList(this.$route.params.classify)
    },
  },
  created () {
    var { classify, title } = this.$route.params
    this.getPage({ classify, title })
  },
}
</script>


<style>
</style>