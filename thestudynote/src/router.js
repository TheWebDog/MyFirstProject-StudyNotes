import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [

    {
      path: '/writePage',
      component: () => {
        return import('./components/page/WritePage.vue')
      },
    },
    {
      path: '/',
      component: () => {
        return import('./components/Home.vue')
      },
      name: '',
      children: [
        {
          path: '/:classifyId',
          name: ' ',
          component: () => {
            return import('./components/page/ClassifyPage.vue')
          },
        },
        {
          path: '/:classify/:title',
          component: () => {
            return import('./components/page/Page.vue')
          },
          name: ':classify/:title',
        },
        {
          path: '*',
          name: ' ',
          component: () => {
            return import('./components/HomeBody.vue')
          },
        },
      ],
    },
  ],
})
