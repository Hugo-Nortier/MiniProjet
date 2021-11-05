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
import Restaurant from "./components/Restaurant.vue";
import InsererRestaurant from "./components/InsererRestaurant.vue";
import Menu from "./components/Menu.vue";
import Panier from "./components/Panier.vue";

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
      path: '/newRestau',
      component: InsererRestaurant
    },
    {
      path: '/menu',
      component: Menu
    },
    {
      path: '/panier',
      name: 'panier',
      component: Panier
    }
  ],
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
