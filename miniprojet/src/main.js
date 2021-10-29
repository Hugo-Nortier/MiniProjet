import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueRouter from 'vue-router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import ListeDesRestaurants from "./components/ListeDesRestaurants.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Restaurant from "./components/Restaurant.vue";

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

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
