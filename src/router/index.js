import Vue from 'vue'
import Router from 'vue-router';
import saas from '@/view/saasHT';
import mainApp from '../view/message/mainApp'
import reportIndex from '../view/reportTemplate/reportIndex'
import reportTest from '../view/reportTemplate/ddd'

import Messagenotification from '../view/message/Messagenotification'


import Login from '../view/login';

//const Login = r => require.ensure([], () => r(require('@/view/login')), 'Login');


Vue.use(Router)

export default new Router({
  // mode: 'history', 无需重新加载页面 要后台配置支持
  // base: __dirname, // 前进后退简写
  routes: [
    {
      name: 'Login',
      path: '/',
      component: Login,
      meta: {
        keepAlive: true
      }
    },
    {
      name: 'saas',
      path: '/saas/message',
      component: saas,
      meta: {
        title: 'SAASBI'
      },
      children: [
        {
          path: 'mainApp',
          component: mainApp,
          name: 'mainApp',
          meta: {
            title: '报表系统'
          }
        },
        {
          path: 'Messagenotification',
          component: Messagenotification,
          name: 'Messagenotification',
          meta: {
            title: 'Messagenotification'
          }
        },
        {
          path: 'reportIndex',
          component: reportIndex,
          name: 'reportIndex',
          meta: {
            title: '报表系统',
            key: '2-1',
            isShowTabs:true,
          }
        },
        {
          path: 'reportTest',
          component: reportTest,
          name: 'reportTest',
          meta: {
            title: '报表系统aaa',
            key: '2-1',
            isShowTabs:true,
          }
        },
      ]
    }
  ]
})

