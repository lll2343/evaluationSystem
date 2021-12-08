import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/index'; // 首页
import Desc from '@/components/menu/describe'; // 介绍

import nofound from '@/components/404/404page'; // 404

import userlogin from '@/components/users/login'; // 用户登录
import personal from '@/components/users/personal'; // 用户个人界面
import forgetpwd from '@/components/users/forget'; // 忘记密码，找回

import evaluation from '@/components/menu/evaluation'; // 测评
import assresult from '@/components/GBA/results'; // 测评结果


import adminlogin from '@/components/admin/login'; // 管理员登录
import adminhome from '@/components/admin/home'; // 管理员首页

import animal from '@/components/GBA/animal/myanimal';

import raven from '@/components/GBA/raven/Raven';


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
      path: '/assresult',
      name: 'assresult',
      component: assresult
    },
    {
      path: '/userlogin',
      name: 'userlogin',
      component: userlogin
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      component: forgetpwd
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: adminlogin
    },
    {
      path: '/adminhome',
      name: 'adminhome',
      component: adminhome,
      children: [
        {
            "path": "/userlist",
            component: () => import("@/components/admin/userlist.vue")
        },
        {
            "path": "/userquery",
            component: () => import("@/components/admin/userquery.vue")
        },
        {
            "path": "/more",
            component: () => import("@/components/admin/more.vue")
        },
        {
          "path": "/userdetail",
          component: () => import("@/components/admin/userdetail.vue")
      }
    ],
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
    },{
      path: '/animal',
      name: 'animal',
      component: animal
    },
    {
      path: '/raven',
      name: 'raven',
      component: raven
    },
    {
      path: '*',
      name: 'nofound',
      component: nofound
    }
  ]
})
