import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 代码高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/googlecode.css'
Vue.directive('highlight', function (el) {
  var blocks = el.querySelectorAll('code');
  blocks.forEach((item) => {
    hljs.highlightBlock(item)
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
