<template>
  <div class="search">
      <input
        class="search_input"
        type="text"
        placeholder="Search..."
        @input="changeValue($event)"
      />
      <div class="overlay"></div>
  </div>
</template>

<script>
// mapActions获取actions中函数
import { mapActions } from 'vuex'
export default {
  name: "Search",
  methods: {
    ...mapActions(["change_searchValue"]),
    changeValue: function (e) {
      var value = e.target.value
      this.change_searchValue(value)
    }
  }
}
</script>