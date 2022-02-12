<template>
  <div class="md_container">
    <div class="md_left">
      <div class="left_head">
        <div class="go_back">
          <div class="go_back_btn" @click="goBack">◀返回</div>
        </div>
        <div class="left_head_value">编辑区</div>
      </div>
      <div class="left_title">
        <input
          placeholder="标题区"
          type="text"
          class="md_input"
          @input="set_input($event)"
        />
      </div>
      <div class="left_content">
        <textarea @input="set_textarea($event)" placeholder="由此开始新篇章" />
        <div class="left_bottom">
          <div class="left_classify">
            <input
              list="browsers"
              type="text"
              placeholder="分类"
              @input="set_classify($event)"
            />
            <datalist id="browsers">
              <option
                v-for="(item, index) in getClassifyList"
                :key="index"
                :value="item"
              ></option>
            </datalist>
          </div>
          <div class="left_btn">
            <div class="left_submit" @click="set_submit">提交</div>
            <div class="left_download" @click="set_download">下载</div>
          </div>
        </div>
      </div>
    </div>
    <div class="md_right">
      <div class="right_head">预览区</div>
      <div class="right_title">
        <!-- 渲染标题 -->
        <div class="right_title_value">
          {{ getTitle }}
        </div>
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
    ...mapGetters(['getClassifyList','getTitle', 'getContext'])
  },
  methods: {
    ...mapActions(['get_input', 'get_textarea', 'get_classify', 'btn_submit']),
    set_input (e) {
      this.get_input(e.target.value)
    },
    set_textarea (e) {
      this.get_textarea(e.target.value)
    },
    set_classify (e) {
      this.get_classify(e.target.value)
    },
    set_submit () {
      this.btn_submit()
      // this.$router.back()
    },
    set_download () {
      console.log('下载功能暂未开发')
      alert('下载功能暂未开发')
    },
    goBack () {
      this.$router.back()
    },
  },
  // created () {

  // },
}
</script>