import Vue from 'vue'
import Router from 'vue-router'
import PublishPage from '@/components/PublishPage'
import document from '../document'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: document.basePath,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PublishPage,
      redirect: '/1-1'
    },
    {
      path: '/:page-:section',
      name: 'PublishPage',
      component: PublishPage
    },
  ]
})
