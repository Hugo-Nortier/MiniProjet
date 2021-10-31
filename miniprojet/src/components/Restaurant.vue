<template>
  <div class="hello">
    <h1 class="mt-5 pt-5">Détail du restau n° {{ id }}</h1>
    <ul>
      <li>Nom: {{ name }}</li>
      <li>Cuisine: {{ cuisine }}</li>
      <li>Adresse: {{ street }}</li>
      <li>Ville: {{ zipcode }} {{ borough }}</li>
      <li>
        Dernière notation le: {{ dategrade }}, note:
        {{ grade }}
      </li>
      <li>Coordonnées: {{ coo[1] }}, {{ coo[0] }}</li>
    </ul>
    <l-map
      :center="center"
      :zoom="zoom"
      class="map"
      ref="map"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url"> </l-tile-layer>
      
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  name: "Restaurant",
  props: {},
  components: {
    LMap,
    LTileLayer,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 13,
      center:[0.0,0.0],
      name: "",
      cuisine: "",
      street: "",
      zipcode: "",
      borough: "",
      grade: "",
      dategrade: "",
      coo: [],
    };
  },
  mounted() {
    console.log("avant affichage");
    console.log("id= " + this.id);
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        this.name = data.restaurant.name;
        this.cuisine = data.restaurant.cuisine;
        this.street = data.restaurant.address.street;
        this.zipcode = data.restaurant.address.zipcode;
        this.borough = data.restaurant.borough;
        this.grade = data.restaurant.grades[0];
        this.dategrade = data.restaurant.grades[0].date.split("T")[0];
        this.coo = data.restaurant.address.coord;
        let c0 = this.coo[0];
        let c1 = this.coo[1];
        this.center = [c1, c0];
       // this.markers[0].coordinates = [c1, c0];
      });
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  position: absolute;
  width: 50%;
  height: 50%;
  overflow: hidden;
}
</style>
