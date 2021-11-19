import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index'

import nofound from '@/components/404/404page'

import Login from '@/components/menu/login'
import evaluation from '@/components/menu/evaluation'
import personal from '@/components/menu/personal'

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
