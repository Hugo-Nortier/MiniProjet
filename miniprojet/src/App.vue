<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-navbar-nav>
        <b-nav-item to="/">Liste Des Restaurants</b-nav-item>
        <b-nav-item to="/newRestau">Renseigner nouveau restaurant</b-nav-item>
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
