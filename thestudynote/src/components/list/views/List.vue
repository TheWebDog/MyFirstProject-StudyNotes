<template>
  <div class="">
    <ul class="list_ul">
      <li
        @click="toPage(item.classify, item.title)"
        class="list_li"
        v-for="(item, index) in getList"
        :key="index"
      >
        <p class="title">{{ item.title }}</p>
        <p class="classify">
          <span class="thespan"> 分类</span>：
          <span class="thespan">{{ item.classify }}</span>
        </p>
        <p class="date">
          <span class="thespan"> 编写日期</span>：
          <span class="thespan">{{ item.date }}</span>
        </p>
        <p class="count">访问次数： {{ item.count }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "List",
  computed: {
    ...mapGetters(['getList']),
  },
  methods: {
    ...mapActions(['geClassifyList']),
    toPage: function (classify, title) {
      this.$router.push(`/page/${classify}/${title}`)
    },
  },
  created () {
    var classifyId
    if (this.$route.params.classifyId) {
      classifyId =this.$route.params.classifyId
    }else{
      classifyId = this.$route.fullPath
    }
    this.geClassifyList(classifyId)
  },
};
</script>