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
    ...mapActions(["changeFilter","geHotList","geSearchList"]),
    changethefilter: function (item) {
      var value=this.$store.state.searchStore.searchValue
      if(item=='热门'){
        this.geHotList()
      }else{
        this.geSearchList(value)
      }
      this.changeFilter(item);
    },
  },
  // watch: {
  //   $route (to) {
  //     console.log(to.path);//到哪去
  //   }
  // },
  // created(){
  //   console.log('created')
  // },
};
</script>