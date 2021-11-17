import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import nofound from '@/components/404/404page'
import evaluation from '@/components/evaluation'
import personal from '@/components/personal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: evaluation
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/nofound',
      name: 'nofound',
      component: nofound
    },
    {
      path: '*',
      name: 'nofound',
      component: nofound
    }
  ]
})
