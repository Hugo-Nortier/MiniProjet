<template>
  <div class="hello">
    <h1>Détail du restau n° {{ id }}</h1>
    <ul>
      <li>Nom: {{ restaurant.name }}</li>
      <li>Cuisine: {{ restaurant.cuisine }}</li>
      <li>Adresse: {{ restaurant.address.street }}</li>
      <li>Ville: {{ restaurant.address.zipcode }} {{ restaurant.borough }}</li>
      <li>
        Dernière notation le: {{ restaurant.grades[0].date.split("T")[0] }},
        note:
        {{ restaurant.grades[0].grade }}
      </li>
      <li>Coord: {{ restaurant.address.coord[0] }}</li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Restaurant",
  props: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null,
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
        this.restaurant = data.restaurant;
      });
    //document.getElementById('map').src = 'https://maps.google.com/maps?q='+this.restaurant.address.coord[0]+','+this.restaurant.address.coord[1]+'&hl=es;z=14&amp;output=embed';
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
