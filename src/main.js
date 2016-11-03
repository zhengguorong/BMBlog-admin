import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routerConfig from './routers'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter({routes: routerConfig})
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

