<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-navbar-nav>
        <b-nav-item
          ><router-link to="/">Liste Des Restaurants</router-link></b-nav-item
        >
        <b-nav-item v-b-modal.modal-insertion
          >Insérer Nouveau Restaurant</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
