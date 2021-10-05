import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueRouter from 'vue-router'

import ListeDesRestaurants from "./components/ListeDesRestaurants.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Restaurant from "./components/Restaurant.vue";

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
  {
    path: '/',
    component: ListeDesRestaurants
  },
  {
    path: '/restaurant/:id',
    component: Restaurant
  },
  {
    path: '/hello',
    component: HelloWorld,
    props:{
      msg: "coucou la miage !"
    }
  }],
  node: 'history'
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
