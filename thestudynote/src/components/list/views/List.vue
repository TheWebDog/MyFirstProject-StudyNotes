<template>
  <div class="list">
    <ul class="list_ul">
      <li
        @click="toPage(item.classify, item.title)"
        class="list_li"
        v-for="(item, index) in getList"
        :key="index"
      >
        <p class="title">{{ item.title }}</p>
        <p class="classify">
          <span> 分类</span>： <span>{{ item.classify }}</span>
        </p>
        <p class="date">
          <span> 编写日期</span>： <span>{{ item.date }}</span>
        </p>
        <p class="synopsis">
          <span> 简介</span>： <span> {{ item.synopsis }}</span>
        </p>
        <p class="count">访问次数： {{ item.count }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "List",
  computed: {
    ...mapGetters(['getList'])
  },
  methods: {
    toPage: function (classify, title) {
      this.$router.push(`/page/${classify}/${title}`)
    }
  }
};
</script>