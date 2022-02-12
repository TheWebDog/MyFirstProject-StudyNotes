<template>
  <div>
    <div class="classify_container">
      <div class="classify_list_container1">
        <div class="thetop"></div>

        <div class="classify_list_container2">
          <div class="classify_list">
            <ul class="classify_ul">
              <li
                class="classify_li"
                :class="{ choicedli: $route.params.classify == item }"
                v-for="(item, index) in getClassifyList"
                v-bind:key="index"
                @click="goToTheClassify(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="cssgoodlook"></div>
        </div>

        <div class="thebottom"></div>
      </div>

      <div class="list_ClassifyPage">
        <List :key="$route.params.classify"></List>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from '../list/index'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ClassifyPage',
  components: {
    List,
  },
  computed: {
    ...mapGetters(['getClassifyList']),
  },
  methods: {
    // this.$route.params.classify
    ...mapActions(['getNav','geClassifyList']),
    goToTheClassify (classify) {
      if (this.$route.params.classify != classify) {
        this.$router.replace(`/ClassifyPage/${classify}`)
      }
      this.geClassifyList(classify)
    },
  },
  created () {
    this.getNav()
  },
}
</script>