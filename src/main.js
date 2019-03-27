import 'babel-polyfill';
import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import VuePlotly from '@statnett/vue-plotly';
import VueMoment from 'vue-moment';
import VueSlider from 'vue-slider-component';

import $ from 'jquery'; 

import 'v-calendar/lib/v-calendar.min.css';
import 'vue-slider-component/theme/default.css';

import App from './App.vue';
import router from './router';

Vue.use(VCalendar);
Vue.use(vClickOutside);
Vue.use(VueSweetalert2);
Vue.use(VuePlotly);
Vue.use(VueMoment);
Vue.component('VueSlider', VueSlider);
Vue.config.productionTip = false;

// const $ = require('jquery');
window.$ = $; 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
