import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Hello from '../components/Hello'
import heading from '../components/Heading'
import news from '../components/News'

import signin from '../components/signin'
import signup from '../components/signup'
export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'heading',
      component: heading
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },     
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },   
    {
      path: '/news',
      name: 'news',
      component: news,
    },
  ]
})

