<template>
  <div class="markdown-body .markdown-here-wrapper" v-highlight v-html="getHtml">
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
  name:'MDContext',
  computed : {
    ...mapGetters(['getHtml'])
  }
}
</script>