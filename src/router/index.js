import Vue from 'vue'
import Router from 'vue-router';
import login from '@/view/login';
import saas from '@/view/saasHT';


// import nationwide from '../view/message/nationwideEcharts';
// import regionEcharts from '../view/message/regionEcharts';
import mainApp from '../view/message/mainApp'
import demo from '../view/message/demo'
import demo1 from '../view/message/demo1'
import reportIndex from '../view/reportTemplate/reportIndex'

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
        // {
        //   path: 'nationwide',
        //   component: nationwide,
        //   name: '全国简报',
        //   ind:1,
        //   meta: {
        //     title: '全国简报',
        //     ind:1,
        //   }
        // },
        // {
        //   path: 'regionEcharts',
        //   component: regionEcharts,
        //   name: '大区简报',
        //   ind:2,
        //   meta: {
        //     title: '大区简报',
        //     ind:2,
        //   }
        // },
        {
          path: 'mainApp',
          component: mainApp,
          name: 'mainApp',
          meta: {
            title: 'mainApp'
          }
        },
        {
          path: 'demo',
          component: demo,
          name: 'demo',
          meta: {
            title: 'demo'
          }
        },
        {
          path: 'demo1',
          component: demo1,
          name: 'demo1',
          meta: {
            title: 'demo1'
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
      ]
    }
  ]
})

