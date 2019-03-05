import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import VuePlotly from '@statnett/vue-plotly'

import 'v-calendar/lib/v-calendar.min.css';

import App from './App.vue'
import router from './router'

Vue.use(VCalendar);
Vue.use(vClickOutside);
Vue.use(VueSweetalert2);
Vue.use(VuePlotly);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
