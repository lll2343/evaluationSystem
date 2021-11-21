import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index'

import nofound from '@/components/404/404page'

import Login from '@/components/menu/login'
import evaluation from '@/components/menu/evaluation'
import personal from '@/components/menu/personal'
import Desc from '@/components/menu/describe'

import Hanoi from '@/components/GBA/hanoi'

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
      path: '/hanoi',
      name: 'Hanoi',
      component: Hanoi
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
      path: '/desc',
      name: 'desc',
      component: Desc
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
