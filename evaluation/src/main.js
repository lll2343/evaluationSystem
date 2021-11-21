// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)


import less from 'less'
Vue.use(less)

Vue.config.productionTip = false

import Common from '@/components/common/common'
Vue.prototype.Common = Common;

import axios from 'axios'
//允许跨域请求携带用户凭证cookies 否则session不起作用
axios.defaults.withCredentials = true;//位置必须要在添加到vue原型对象的前面
Vue.prototype.$axios = axios

// 全屏滚动 vue-fullpage.js
import 'fullpage.js/vendors/scrolloverflow';
import VueFullpage from 'vue-fullpage.js'
Vue.use(VueFullpage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
