import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/page/:classify/:title',
      component: () => {
        return import('./components/page/Page.vue')
      },
      name: 'page/:classify/:title',
    },
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
          path: '*',
          name: ' ',
          component: () => {
            return import('./components/HomeBody.vue')
          },
        },
      ],
      // beforeEnter(to, from, next) {
      //   // 路由独享守卫
      //   console.log(to, '--to')
      //   console.log(from, '--from')
      //   console.log(next, '--next')
      //   next()
      // },
    },
  ],
})
