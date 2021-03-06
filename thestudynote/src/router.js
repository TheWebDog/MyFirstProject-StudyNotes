import Vue from 'vue'
import VueRouter from 'vue-router'

// 破除导航重复报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

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
          path: '/ClassifyPage/:classify',
          name: 'ClassifyPage/:classify',
          component: () => {
            return import('./components/page/ClassifyPage.vue')
          },
        },
        {
          path: '/ClassifyPage/:classify/:title',
          component: () => {
            return import('./components/page/Page.vue')
          },
          name: 'ClassifyPage/:classify/:title',
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
