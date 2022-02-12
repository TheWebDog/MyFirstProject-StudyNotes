<template>
  <div class="search">
    <input
      class="search_input"
      type="text"
      placeholder="Search..."
      @input="changeValue($event)"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Search",
  methods: {
    ...mapActions(["geSearchList", "changeFilter", "change_searchValue","geHotList"]),
    changeValue: function (e) {
      var value = e.target.value
      this.change_searchValue(value)
      if (value.length != 0) {
        this.$router.replace(value)
        this.geSearchList(value)
        this.changeFilter('搜索')
      } else {
        this.changeFilter('热门')
        this.geHotList()
      }
    }
  },
}
</script>