import Vue from 'vue'
import Vuex from 'vuex'
// store的注入
import { navStore } from './components/nav/index'
import { searchStore } from './components/search/index'
import { filterStore } from './components/thefilter/index'
import { listStore } from './components/list/index'
import { markdownStore } from './components/markdown/index'
import { pageViewStore } from './components/pageView/index'
// 好像不加index也行


Vue.use(Vuex)

const store = new Vuex.Store({
  // 注入到根store
  modules: {
    navStore,
    searchStore,
    filterStore,
    listStore,
    markdownStore,
    pageViewStore,
  },
})

export default store
