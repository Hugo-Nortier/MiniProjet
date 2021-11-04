<template>
  <div class="mt-5 pt-5">
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-navbar-nav>
        <b-nav-item to="/">Liste Des Restaurants</b-nav-item>
        <b-nav-item-dropdown
          text="Filtrer"
          right
        >
        <b-nav-item @click="filtrerRestau('burger')">
          <img
            src="../assets/burger.png"
            width="40px"
            alt="Burgers"
            title="Filtrer les restau qui vendent des burgers"
          /> Hamburger
        </b-nav-item>
        <b-nav-item @click="filtrerRestau('pizza')">
          <img
            src="../assets/pizza.png"
            width="40px"
            alt="Pizza"
            title="Filtrer les restau qui vendent des pizza"
          /> Pizza
        </b-nav-item>
        <b-nav-item @click="filtrerRestau('sandwich')">
          <img
            src="../assets/sandwich.png"
            width="40px"
            alt="Sandwich"
            title="Filtrer les restau qui vendent des sandwiches"
          /> Sandwich
        </b-nav-item>
        <b-nav-item @click="filtrerRestau('salad')">
          <img
            src="../assets/salad.png"
            width="40px"
            alt="Salad"
            title="Filtrer les restau qui vendent des salades"
          /> Salade
        </b-nav-item>
        <b-nav-item @click="filtrerRestau('donuts')">
          <img
            src="../assets/dessert.png"
            width="40px"
            alt="Donuts"
            title="Filtrer les restau qui vendent des donuts"
          /> Donuts
        </b-nav-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          text="Outils Admin"
          right
        >
        <b-dropdown-item to="/newRestau">Renseigner nouveau restaurant</b-dropdown-item>
        <b-dropdown-item @click="dsuppr()">
          Supprimer restaurant</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>

    <b-modal
      id="modal-insertion"
      title="Renseigner un nouveau restaurant"
      ok-only
    >
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
    </b-modal>

    <b-modal
      v-model="modalShow"
      id="modal-pas-de-restau"
      title="Aucun restaurant trouvé"
      ok-only
    >
      <md-table-empty-state
        :md-description="
          `Aucun restaurant ne répond à la requête: '${searchtype}' = '${nomRechercheRestau}'.`
        "
      >
      </md-table-empty-state>
    </b-modal>

    <p class="pw ml-5px">
      Nombre de restaurants à afficher par page:
      <b-form-input
        @input="getRestaurantsFromServer()"
        v-model="pagesize"
        type="range"
        min="2"
        max="150"
        step="1"
      ></b-form-input>
      &nbsp;{{ pagesize }}
    </p>

    <div>
      <!-- RESTAU AVEC VUE MATERIAL SANS TRI -->
      <md-table
        class="w-100 styled-table"
        md-sort="name"
        md-sort-order="asc"
        md-card
      >
        <md-table-toolbar>
          <b-container>
            <b-row>
              <div class="md-toolbar-section-start">
                <p class="my-auto">Filtrer par</p>
                <b-form-radio-group
                  v-model="searchtype"
                  name="searchTypeRadioGroup"
                  class="radiogroup"
                >
                  <label for="one">
                    <b-form-radio value="name" checked="checked"
                      >Nom</b-form-radio
                    >
                  </label>
                  <label for="cuisine">
                    <b-form-radio value="cuisine">Cuisine</b-form-radio>
                  </label>
                  <label for="borough">
                    <b-form-radio value="borough">Ville</b-form-radio>
                  </label>
                </b-form-radio-group>
                <p class="ml my-auto">avec la valeur</p>
              </div>
              <md-field md-clearable class="md-toolbar-section-end">
                <md-input
                  placeholder="Valeur de recherche"
                  @input="rechercherRestaurants()"
                  type="text"
                  v-model="nomRechercheRestau"
                />
              </md-field>
            </b-row>
          </b-container>
          <b-container
            ><hr />
            <b-row>
              <b-col class="text-start my-auto">
                <p class="my-auto">Restaurants: {{ nbRestauTotal }}</p>
              </b-col>
              <b-col class="text-center">
                <md-button :disabled="page === 0" @click="pagePrecedente()"
                  ><p class="my-auto">Précédent</p></md-button
                >
                &nbsp;&nbsp;
                <md-button
                  :disabled="page === nbPagesTotal"
                  @click="pageSuivante()"
                  ><p class="my-auto">Suivant</p></md-button
                >
              </b-col>
              <b-col class="text-end my-auto">
                <p class="my-auto">
                  Page actuelle: {{ page + 1 }} / {{ nbPagesTotal + 1 }}
                </p>
              </b-col>
            </b-row>
          </b-container>
        </md-table-toolbar>

        <md-table-row class="entete">
          <md-table-head><b>Nom</b></md-table-head>
          <md-table-head><b>Cuisine</b></md-table-head>
          <md-table-head><b>Adresse</b></md-table-head>
          <md-table-head><b>Ville</b></md-table-head>
          <md-table-head><b>Détails</b></md-table-head>
          <md-table-head class="text-center d-none"
            ><b>Supprimer</b></md-table-head
          >
        </md-table-row>

        <md-table-row
          v-for="(r, index) in restaurants"
          v-bind:key="index"
          v-bind:style="{ backgroundColor: getColor(index) }"
        >
          <md-table-cell md-sort-by="name">{{ r.name }}</md-table-cell>
          <md-table-cell md-sort-by="cuisine">{{ r.cuisine }}</md-table-cell>
          <md-table-cell md-sort-by="borough"
            >{{ r.address.building }} {{ r.address.street }}</md-table-cell
          >
          <md-table-cell md-sort-by="borough"
            >{{ r.address.zipcode }} {{ r.borough }}</md-table-cell
          >
          <md-table-cell>
            <router-link :to="'/restaurant/' + r._id"
              ><i class="fas fa-search-plus"></i>Voir plus</router-link
            >
          </md-table-cell>
          <md-table-cell class="text-center text-danger d-none">
            <i class="fa fa-trash" @click="supprimerRestaurant(r)"></i>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
//import $ from "jquery";
export default {
  name: "ListeDesRestaurants",
  data: function() {
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
      searchtype: "",
      modalShow: false,
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
      url += "&searchtype=" + this.searchtype;
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = res.data;
            this.nbRestauTotal = res.count;
            this.nbPagesTotal = Math.round(this.nbRestauTotal / this.pagesize);
            if (res.data.length < 1) {
              this.modalShow = !this.modalShow;
              console.log("aucun restaurant");
            }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    rechercherRestaurants: _.debounce(function() {
      this.page = 0;
      this.getRestaurantsFromServer();
      console.log("recherche par " + this.searchtype);
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
            this.getRestaurantsFromServer();
          });
        })
        .catch(function(err) {
          console.log(err);
        });
      //raffraichit la vue
      this.getRestaurantsFromServer();
    },
    filtrerRestau(name) {
      this.searchtype = "cuisine";
      this.nomRechercheRestau = name;
      this.page = 0;
      this.getRestaurantsFromServer();
    },
    dsuppr() {
      let dnone = document.getElementsByClassName("d-none");
      while (dnone.length > 0) {
        Array.prototype.forEach.call(dnone, (d) => {
          d.classList.remove("d-none");
        });
      }
    },
    getColor(index) {
      return index % 2 ? "#f3f3f3" : "#c7e6f0";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
