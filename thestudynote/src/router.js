import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => {
        return import('./components/Home.vue')
      },
      name:''
    },
    // {
    //   path: '/page/:classify/:title',
    //   component: () => {
    //     return import('./components/page/Page.vue')
    //   },
    //   name:'page/:classify/:title'
    // },
    {
      path: '/writePage',
      component: () => {
        return import('./components/page/WritePage.vue')
      }
    }
  ]
})