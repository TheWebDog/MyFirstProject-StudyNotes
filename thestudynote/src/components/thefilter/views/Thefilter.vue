<template>
    <ul class="filter_ul">
      <li
        class="filter_li"
        @click="changethefilter(item)"
        v-for="(item, index) in getFilterlist"
        :key="index"
      >
        <button
          :class="{ isChoiced: item == getFilter ? true : false }"
          class="custom-btn btn-13"
        >
          {{ item }}
        </button>
      </li>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "thefilter",
  computed: {
    ...mapGetters(["getFilterlist", "getFilter"]),
  },
  methods: {
    ...mapActions(["changeFilter"]),
    changethefilter: function (e) {
      this.changeFilter(e);
    },
  },
};
</script>