import Vue from 'vue'
import Router from 'vue-router'
import VueMoment from 'vue-moment'
import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.serverUrl = 'http://medicloud.local';
axios.defaults.user_id = null;

import Auth from './views/Auth.vue'
import Dashboard from './views/Dashboard.vue'
import Home from './views/Home.vue'
import Activity from './views/Activity.vue'
import Eclaim from './views/Eclaim.vue'

Vue.use(Router)
Vue.use(axios)
Vue.use(VueMoment)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { path: '*', redirect: '/auth'},
    { path: '/auth', name: 'auth', component: Auth },
    {
      path: '/app',
      name: 'dashboard',
      redirect: '/app/dashboard',
      component: Dashboard,
      meta: { auth: true },
      children: [
        { name: 'Home', path: '/app/dashboard', component: Home },
        { name: 'Activity', path: '/app/activity', component: Activity },
        { name: 'Eclaim', path: '/app/eclaim', component: Eclaim },
      ]
    },
    
  ]
})
