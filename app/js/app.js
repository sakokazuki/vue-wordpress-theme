

import Vue from 'Vue';

//vue setup
import AppRoute from 'components/AppRoute.vue'
const App = Vue.extend(AppRoute)


//vuex setup
import store from 'store'
//vue-router setup
import router from 'router'

// setup axios, add "http" to vuecomponent
import http from 'axios/wrapper';
Vue.prototype.$http = http;

// setup global mixin
const wp_data = {
  data: ()=>{
    return {
      base_url: _WP.base_url
    }
  }
}
Vue.mixin(wp_data)


new App({
  store,
  router
}).$mount('#app');
