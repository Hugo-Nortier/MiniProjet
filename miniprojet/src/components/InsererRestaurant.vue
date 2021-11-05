<template>
  <div class="mt-5 pt-5">
    <h2 class="clignote">{{ msg }}</h2>

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
                <md-input name="name" v-model="name" required />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="cuisine">Type de cuisine</label>
                <md-input name="cuisine" v-model="cuisine" required />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="building">Numéro de rue</label>
                <md-input name="building" v-model="building" required />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="street">Nom de rue</label>
                <md-input name="street" v-model="street" required />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="zipcode">Code postal</label>
                <md-input name="zipcode" v-model="zipcode" required />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="borough">Ville</label>
                <md-input name="borough" v-model="borough" required />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="long">Longitude</label>
                <md-input name="long" v-model="long" required />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="lat">Latitude</label>
                <md-input name="lat" v-model="lat" required />
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
  data: () => ({
    name: "",
    cuisine: "",
    borough: "",
    lat: "",
    long: "",
    building: "",
    street: "",
    zipcode: "",
    msg: ""
  }),
  methods: {
    resetFormulaire(){
      this.name = "";
      this.cuisine = "";
      this.borough = "";
      this.building = "";
      this.street = "";
      this.zipcode = "";
      this.lat = "";
      this.long = "";
    },
    ajouterRestaurant: async function () {
      const pms = {
        nom: this.name,
        cuisine: this.cuisine,
        borough: this.borough,
        lat: this.lat,
        long: this.long,
        building: this.building,
        street: this.street,
        zipcode: this.zipcode,
      };
      const url = new URL("http://localhost:8080/api/restaurants"),
        params = pms;
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key]),
        console.log(url)
      );
      const res = await fetch(url, { method: "POST" });
      this.msg = "Bravo! Vous avez ajouté le restaurant: " + this.name;
      const json = await res.json;
      console.log(json);
      this.resetFormulaire();
    },
  },
};
</script>

<style>
.clignote {color:#00ff0d;animation: clignote 1.2s linear infinite;}
@keyframes clignote {50% { opacity: 0.6; }}
</style>
