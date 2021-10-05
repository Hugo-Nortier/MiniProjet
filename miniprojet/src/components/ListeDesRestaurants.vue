htt<template>
  <div>
    <form v-on:submit="ajouterRestaurant($event)">
      <p>
        Ajouter un restaurant à la liste => &nbsp;&nbsp;&nbsp;
        <label>
          Nom : <input name="nom" type="text" required v-model="nom" />
        </label>
        <label>
          Cuisine :
          <input
            name="cuisine"
            type="text"
            required
            v-model="cuisine"
          /> </label
        >&nbsp;
        <button>Ajouter</button>
      </p>
    </form>
    <p>
      Rechercher restaurant(s) dans la liste => &nbsp;&nbsp;&nbsp;
      <label
        >Nom :
        <input
          @input="rechercherRestaurants()"
          type="text"
          v-model="nomRechercheRestau"
      /></label>
    </p>
    <p>
      Nombre de restaurants à afficher par page:
      <input
        @input="getRestaurantsFromServer()"
        type="range"
        min="2"
        max="150"
        v-model="pagesize"
      />{{ pagesize }}
    </p>

    <div>
      <!-- RESTAU AVEC VUE MATERIAL SANS TRI -->
      <md-table class="styled-table" md-sort="name" md-sort-order="asc" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Restaurants: {{ nbRestauTotal }}</h1>
          <div class="wrapper">
            <md-button :disabled="page === 0" @click="pagePrecedente()"
              >Précédent</md-button
            >
            &nbsp;&nbsp;
            <md-button :disabled="page === nbPagesTotal" @click="pageSuivante()"
              >Suivant</md-button
            >
          </div>
          <h2 class="p-act">
            Page actuelle: {{ page + 1 }} / {{ nbPagesTotal + 1 }}
          </h2>
        </md-table-toolbar>
        <md-table-toolbar>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input
              placeholder="Recherche par nom..."
              @input="rechercherRestaurants()"
              type="text"
              v-model="nomRechercheRestau"
            />
          </md-field>
        </md-table-toolbar>

        <md-table-row class="entete">
          <md-table-head><b>Nom</b></md-table-head>
          <md-table-head><b>Cuisine</b></md-table-head>
          <md-table-head><b>Détails</b></md-table-head>
        </md-table-row>

        <md-table-row
          v-for="(r, index) in restaurants"
          v-bind:key="index"
          v-bind:style="{ backgroundColor: getColor(index) }"
        >
          <md-table-cell md-sort-by="name">{{ r.name }}</md-table-cell>
          <md-table-cell md-sort-by="cuisine">{{ r.cuisine }}</md-table-cell>
          <md-table-cell>
            <router-link :to="'/restaurant/' + r._id"
              ><i class="fas fa-search-plus"></i>Voir plus</router-link
            >
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div>
      <!-- RESTAU AVEC VUE MATERIAL AVEC TRI -->
      <md-table
        class="styled-table"
        v-model="restaurants"
        md-sort="name"
        md-sort-order="asc"
        md-card
      >
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Restaurants triables</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input
              placeholder="Recherche par nom..."
              @input="rechercherRestaurants()"
              type="text"
              v-model="nomRechercheRestau"
            />
          </md-field>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
            item.cuisine
          }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "ListeDesRestaurants",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      nbRestauTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRechercheRestau: "",
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.nbPagesTotal) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRechercheRestau;
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = res.data;
            this.nbRestauTotal = res.count;
            this.nbPagesTotal = Math.round(this.nbRestauTotal / this.pagesize);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    rechercherRestaurants: _.debounce(function () {
      this.getRestaurantsFromServer();
    }, 300),
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;
      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(res.msg);
            //affiche msg dans la page
            //this.msg = res.msg;

            //raffraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    ajouterRestaurant(event) {
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(res.msg);
            //affiche msg dans la page
            //this.msg = res.msg;

            //raffraichit la vue
            this.getRestaurantsFromServer;
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      this.nom = "";
      this.cuisine = "";
    },

    getColor(index) {
      return index % 2 ? "#f3f3f3" : "#c7e6f0";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
