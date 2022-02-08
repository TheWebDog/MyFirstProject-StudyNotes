<template>
    <div class="page_markdown">
      <Markdown></Markdown>
    </div>
</template>

<script>
import {Markdown} from '../markdown/index'
export default {
  name:'WritePage',
  components : {
    Markdown,
  }
}
</script>

<style>
.page_markdown{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>