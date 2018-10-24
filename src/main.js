// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import $ from 'jquery'
Vue.prototype.$ = $;
import CryptoJS from 'crypto-js'

import 'element-ui/lib/theme-chalk/index.css'
import Axios from '@/utils/diyaxios'
import common from '@/common/common.js'

import LazyRender from 'vue-lazy-render'
Vue.use(LazyRender)

Vue.prototype.HOST = '/api'

Vue.prototype.$http = Axios;
Vue.prototype.$common = common;

import echarts from "echarts"
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(echarts);

var routeList = [];
router.beforeEach((to, from, next) => {
  var index = -1;
  for(var i = 0; i < routeList.length; i++) {
    if(routeList[i].name == to.name) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
//如果存在路由列表，则把之后的路由都删掉
    routeList.splice(index + 1, routeList.length - index - 1);
  } else if(to.name != '登录'){
    routeList.push({"name":to.name,"path":to.fullPath,"index":index++});
  }
  to.meta.routeList = routeList;
  next()
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

