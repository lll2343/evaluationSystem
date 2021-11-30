import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/index'; // 首页

import nofound from '@/components/404/404page'; // 404

import userlogin from '@/components/users/login'; // 用户登录
import personal from '@/components/users/personal'; // 用户个人界面
import forgetpwd from '@/components/users/forget'; // 忘记密码，找回

import evaluation from '@/components/menu/evaluation'; // 测评
import Desc from '@/components/menu/describe'; // 介绍

import adminlogin from '@/components/admin/login'; // 管理员登录
import adminhome from '@/components/admin/home'; // 管理员首页

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
      component: adminhome
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
