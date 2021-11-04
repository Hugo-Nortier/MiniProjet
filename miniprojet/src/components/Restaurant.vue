<template>
  <div class="hello pw">
    <h3 class="mt-5 pt-5">Détail du restaurant n° {{ id }}</h3>
    <ul>
      <li>Nom: {{ name }}</li>
      <li>Cuisine: {{ cuisine }}</li>
      <li>Adresse: {{ building }} {{ street }}</li>
      <li>Ville: {{ zipcode }} {{ borough }}</li>
      <li>
        Dernière notation : note =
        {{ grade }} le: {{ dategrade }}
      </li>
      <li>Coordonnées: {{ coo[1] }}, {{ coo[0] }}</li>
    </ul>
    <b-row>
      <b-col>
        <b-img id="photoRestau" src="" alt="Image du restau"></b-img>
      </b-col>
      <b-col>
        <l-map
          :center="center"
          :zoom="zoom"
          class="map"
          ref="map"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
        >
          <l-tile-layer :url="url"> </l-tile-layer>
          <l-marker :lat-lng="marker"></l-marker>
        </l-map>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
  name: "Restaurant",
  props: {},
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [0.0, 0.0],
      name: "",
      cuisine: "",
      building: "",
      street: "",
      zipcode: "",
      borough: "",
      grade: "N/A",
      dategrade: "N/A",
      coo: [],
      marker: [0.0, 0.0],
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
        this.building = data.restaurant.address.building;
        this.street = data.restaurant.address.street;
        this.zipcode = data.restaurant.address.zipcode;
        this.borough = data.restaurant.borough;
        this.grade = data.restaurant.grades[0].grade;
        this.dategrade = data.restaurant.grades[0].date.split("T")[0];
        this.coo = data.restaurant.address.coord;
        let c0 = this.coo[0];
        let c1 = this.coo[1];
        this.center = [c1, c0];
        this.marker = [c1, c0];
        this.afficherPhotoRestau();
      });
    // leaflet a, par défaut, un lien d'icone invalide,
    // ceci remet en place correctement l'icone.
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
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
    afficherPhotoRestau() {
      let API_KEY = "24156846-4f9cb14e5661384e869013db0";
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${this.cuisine}%20food`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if(result.hits.length>0)
              document.getElementById("photoRestau").src=result.hits[0].previewURL;
            else document.getElementById("photoRestau").src ="https://www.yonder.fr/sites/default/files/news/The-Peninsula-Paris__L%27Oiseau-Blanc__Restaurant.jpg";
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style scoped>
.map {
  position: absolute;
  width: 40%;
  height: 50%;
  overflow: hidden;
}
#photoRestau{
  position: absolute;
  width: 40%;
  height: 50%;
}
</style>
