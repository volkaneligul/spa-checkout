import Vue from 'vue'
import App from './App.vue'

import storeOptions from './stores/store'
import routerOptions from './routers/router'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter(routerOptions)

const store = new Vuex.Store(storeOptions)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
