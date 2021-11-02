<template>
  <div class="mt-5 pt-5">
    <h2 class="pw">{{ msg }}</h2>

    <form
      novalidate
      class="md-layout"
      @submit.prevent="ajouterRestaurant($event)"
      autocomplete="off"
    >
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Renseigner un nouveau restaurant :</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="name">Nom du restaurant</label>
                <md-input name="name" v-model="form.name" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="cuisine">Type de cuisine</label>
                <md-input name="cuisine" v-model="form.cuisine" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="building">Numéro de rue</label>
                <md-input name="building" v-model="form.address.building" disabled/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="street">Nom de rue</label>
                <md-input name="street" v-model="form.address.street" disabled/>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="zipcode">Code postal</label>
                <md-input name="zipcode" v-model="form.address.zipcode" disabled/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="borough">Ville</label>
                <md-input name="borough" v-model="form.borough" disabled/>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="long">Longitude</label>
                <md-input name="long" v-model="form.address.long" disabled/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="lat">Latitude</label>
                <md-input name="lat" v-model="form.address.lat" disabled/>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary"
            >Ajouter Restaurant</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "nouveauRestaurant",
  data: () => ({
    form: {
      nom: "",
      cuisine: "",
      borough: "",
      address: {
        building: "",
        lat: "",
        long: "",
        street: "",
        zipcode: "",
      },
    },
    msg: "",
  }),
  mounted() {
  },
  methods: {
    resetFormulaire() {
        this.form.name = "";
        this.form.cuisine = "";
        this.form.borough = "";
        this.form.address.building = "";
        this.form.address.lat = "";
        this.form.address.long = "";
        this.form.address.street = "";
        this.form.address.zipcode = "";
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
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
          });
          this.resetFormulaire();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
