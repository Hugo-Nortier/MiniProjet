<template>
  <div id="Panier">
    <md-table>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Panier</h1>
        </div>
      </md-table-toolbar>

      <md-table-row v-for="menu of menus" :key="menu">
        <md-table-cell md-label="nomMenu">
          {{ menu[0] }}
        </md-table-cell>
        <md-table-cell md-label="prixMenu">
          {{ menu[1] }} €
        </md-table-cell>
        <md-table-cell md-label="DupliquerMenu">
          <md-button @click="ajouterArticle(menu)"
            ><i class="fa fa-plus-circle"></i>
          </md-button>
        </md-table-cell>
        <md-table-cell md-label="supprimerMenu">
          <md-button @click="supprimerArticle(menu)"
            ><i class="fa fa-trash"></i></md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>

    <p>Total de votre panier: {{ totalPanier }} €</p>
  </div>
</template>

<script>
export default {
  name: "Panier",
  data: function() {
    return {
      menus: null,
      totalPanier: 0,
    };
  },
  created() {
    this.menus = this.$route.params.articles;
    for (var i = 0; i < this.menus.length; i++)
      this.totalPanier += this.menus[i][1];
  },
  methods: {
    supprimerArticle(article) {
      if (this.menus != null) {
        this.totalPanier -= article[1];
        this.menus.splice(this.menus.indexOf(article), 1);
      }
    },
    ajouterArticle(article) {
      this.menus.push(article);
      this.totalPanier += article[1];
    },
  },
};
</script>

<style scoped>
#Panier {
  width: 70%;
  background-color: white;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 5%;
}
</style>
