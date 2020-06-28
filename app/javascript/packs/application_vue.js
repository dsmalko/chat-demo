import axios from 'axios'
import Vue from 'vue'
import VueMoment from 'vue-moment'
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'
import VueAuthDriver from '@websanova/vue-auth/drivers/auth/devise.js'
import VueAuthHttpDriver from '@websanova/vue-auth/drivers/http/axios.1.x.js'
import VueAuthRouterDriver from '@websanova/vue-auth/drivers/router/vue-router.2.x.js'
import App from '../vue/app.vue'
import store from '../vue/store'
import router from '../vue/router'

Vue.router = router
Vue.use(VueMoment);
Vue.use(VueAxios, axios);

let csrfTokenElement = document.getElementsByName('csrf-token')[0]

if (csrfTokenElement) {
  Vue.axios.defaults.headers.common['X-CSRF-Token'] = csrfTokenElement.getAttribute('content')
  Vue.axios.defaults.headers.common['Accept'] = 'application/json'
}

Vue.use(VueAuth, {
  auth: VueAuthDriver,
  http: VueAuthHttpDriver,
  router: VueAuthRouterDriver,
  loginData: {
    url: 'auth/sign_in',
    method: 'POST',
    redirect: '/',
    fetchUser: true
  },
  logoutData: {
    url: 'auth/logout',
    method: 'POST',
    redirect: '/login',
    makeRequest: false
  },
  refreshData: {
    //url: 'auth/validate_token',
    //method: 'GET',
    enabled: false,
    //interval: 30
  },
  fetchData: {
    url: 'profile',
    method: 'GET',
    enabled: true
  },
  parseUserData: function (data) {
    return data;
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('root'))

  const app = new Vue({
    el,
    store,
    router,    
    render: h => h(App)
  })
})
