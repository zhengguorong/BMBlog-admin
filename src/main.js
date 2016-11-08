import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routerConfig from './routers'
import store from './vuex/store'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter({routes: routerConfig})
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})

