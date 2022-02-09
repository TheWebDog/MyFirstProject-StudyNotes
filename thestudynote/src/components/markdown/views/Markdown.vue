<template>
  <div class="md_container">
    <div class="md_left">
      <div class="left_head">编辑区</div>
      <div class="left_tittle md_tittle">
        <input
          placeholder="标题区"
          type="text"
          class="md_input"
          @input="set_input($event)"
        />
      </div>
      <div class="left_content md_content" @input="set_textarea($event)">
        <textarea />
      </div>
    </div>
    <div class="md_right">
      <div class="right_head">预览区</div>
      <div class="right_tittle">
        <!-- 渲染标题 -->
        {{ getTittle }}
      </div>
      <div class="right_content">
        <div class="right_content_scrollbar">
        <!-- 渲染md -->
        <MDContext></MDContext>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MDContext from './MDContext';
export default {
  name: "Markdown",
  components: {
    MDContext
  },
  computed: {
    ...mapGetters(['getTittle', 'getContext'])
  },
  methods: {
    ...mapActions(['get_input', 'get_textarea']),
    set_input (e) {
      this.get_input(e.target.value)
    },
    set_textarea (e) {
      this.get_textarea(e.target.value)
    },
  },
  created () {

  },
}
</script>