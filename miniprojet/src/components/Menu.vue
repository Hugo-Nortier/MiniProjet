<template>
  <div id="firstDiv">
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-navbar-nav>
        <b-nav-item to="/">Liste Des Restaurants</b-nav-item>
        <b-nav-item to="/newRestau">Renseigner nouveau restaurant</b-nav-item>
        <b-nav-item :to="{ name: 'panier', params: { articles: repas } }">
          <i class="fas fa-shopping-cart"></i> &nbsp;{{ repas.length }}
          article(s)
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <div class="menu-classic menu-classic-single">
      <h4 class="mb-3 text-center"><u>Menu du midi</u></h4>
      <ul class="list-menu">
        <li>
          <div class="menu-item h6">
            <span
              ><span>{{ midiEntree[0] }}</span></span
            ><span class="price">{{ midiEntree[2] }}</span>
          </div>
          <div class="menu-item-desc">
            <span>{{ midiEntree[1] }}</span>
          </div>
        </li>
        <li>
          <div class="menu-item h6">
            <span><span>{{ midiPlat[0] }}</span></span
            ><span class="price">{{ midiPlat[2] }}</span>
          </div>
          <div class="menu-item-desc">
            <span>{{ midiPlat[1] }}</span>
          </div>
        </li>
        <li>
          <div class="menu-item h6">
            <span><span>{{ midiDessert[0] }}</span></span
            ><span class="price">{{ midiDessert[2] }}</span>
          </div>
          <div class="menu-item-desc">
            <span>{{ midiDessert[1] }}</span>
          </div>
        </li>
      </ul>
      <div class="text-center mb-5">
        <md-button @click="ajouterPanier('Menu du Midi', additionMidi())" class="my-auto text-center">Ajouter au panier</md-button>
      </div>
      <h4 class="mb-3 text-center"><u>Menu gastronomique</u></h4>
      <ul class="list-menu">
        <li>
          <div class="menu-item h6">
            <span
              ><span>{{ gastroEntree[0] }}</span></span
            ><span class="price">{{ gastroEntree[2] }}</span>
          </div>
          <div class="menu-item-desc">
            <span>{{ gastroEntree[1] }}</span>
          </div>
        </li>
        <li>
          <div class="menu-item h6">
            <span><span>{{ gastroPlat[0] }}</span></span
            ><span class="price">{{ gastroPlat[2] }}</span>
          </div>
          <div class="menu-item-desc">
            <span>{{ gastroPlat[1] }}</span>
          </div>
        </li>
        <li>
          <div class="menu-item h6">
            <span><span>{{ gastroDessert[0] }}</span></span
            ><span class="price">{{ gastroDessert[2] }}</span>
          </div>
          <div class="menu-item-desc">
            <span>{{ gastroDessert[1] }}</span>
          </div>
        </li>
      </ul>
      <div class="text-center">
        <md-button @click="ajouterPanier('Menu gastronomique', additionGastro())" class="my-auto text-center">Ajouter au panier</md-button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Menu",
  data: function() {
    return {
      entree: [
        [
          "Tartare de saumon",
          "Dés de saumon, citron et ciboulette",
          18
        ],
        [
          "Mousse de truite à l'estragon",
          "Mousse de truite fumée sauvage et estragon BIO",
          25
        ],
        [
          "Foie gras label rouge",
          "Foie Gras du Périgord label rouge AOP",
          22
        ],
        [
          "Crème d'avocat au thon",
          "Verrine de crême d'avocat mûr au thon sauvage",
          15
        ],
        [
          "Verrines saumon fumé & avocat",
          "Verrine de crême d'avocat et saumon fumé frais d'Alaska",
          16
        ],
        [
          "Saumon sauvage & asperges",
          "Saumon sauvage fumé de Norvège et ses asperges à l'huile",
          23
        ],
        [
          "Feuilleté de chèvre & épinard",
          "Pâte feuilletée au fromage de chèvre frais et épinard BIO",
          19
        ],
        [
          "Tomate Mozza",
          "Tomates coeur de boeuf et mozzarella BIO",
          14
        ],
        [
          "Gaspacho",
          "Gaspaccho de tomates rouges et jaunes BIO",
          13
        ],
        [
          "Assiette de charcuterie",
          "Chorizo, saucisson, jambon cru et speck avec cornichon",
          18
        ],
      ],
      plat: [
        [
          "Blanquette de veau",
          "Veau mariné et mijoté pendant 7h avec carotte et champignon",
          18
        ],
        [
          "Sauté de veau au chorizo",
          "Veau tendre au chorizo extra fort d'espagne",
          17
        ],
                [
          "Chili con-carne",
          "Viande de boeuf épicée avec haricots rouges",
          17
        ],
        [
          "Boeuf bourguignon",
          "Boeuf cuisiné au vin rouge de Bourgogne",
          15
        ],
        [
          "Crevettes au curry",
          "Crevettes thaï cuites au wok avec riz basmatique et curry",
          22
        ],
        [
          "Pavé de saumon et riz",
          "Pavé de saumon de Norvège et riz croquant",
          18
        ],
        [
          "Pâtes bolo",
          "Pâte fraîche avec boeuf charolais label rouge et tomate BIO",
          18
        ],
        [
          "Lasagne à la bolognaise",
          "Pâte fraîche avec boeuf charolais et tomate coeur de boeuf",
          16
        ],
      ],
      dessert: [
        [
          "Fondant au chocolat",
          "Gateau au chocolat noir 80% avec coeur fondant",
          14
        ],
        [
          "Tiramisu choco-noisette",
          "Véritable tiramisu au café avec chocolat & noisette",
          14
        ],
        [
          "Tarte au citron",
          "Tarte au citron et crême meringue",
          12
        ],
        [
          "Tarte aux fruits rouges",
          "Tarte aux fraises, framboises et mûres",
          12
        ],
        [
          "Tarte au chocolat",
          "Tarte au chocolat extra noir 80%",
          13
        ],
        [
          "Mousse au chocolat",
          "Mousse au chocolat noir ou au chocolat blanc",
          15
        ],
        [
          "Baba au rhum",
          "Savarin servi imbibé d'un sirop au rhum",
          17
        ],
      ],
      midiEntree: null,
      midiPlat: null,
      midiDessert: null,
      gastroEntree: null,
      gastroPlat: null,
      gastroDessert: null,
      commande: [],
      additionMenu: [],
      repas: [],
      totalPanier: 0,
    };
  },
  methods: {
    randomPlat(plat) {
      return plat[Math.floor(Math.random() * plat.length)];
    },
    additionMidi() {
      return this.getPrix('midientree') + this.getPrix('midiplat') + this.getPrix('mididessert');
    },
    additionGastro() {
      return this.getPrix('gastentree') + this.getPrix('gastrplat') + this.getPrix('gastrdessert');
    },
    getPrix(repas){
      switch (repas) {
        case 'midientree':
          return this.midiEntree[2];
        case 'midiplat':
          return this.midiPlat[2];
        case 'mididessert':
          return this.midiDessert[2];
        case 'gastentree':
          return this.gastroEntree[2];
        case 'gastrplat':
          return this.gastroPlat[2];
        case 'gastrdessert':
          return this.gastroDessert[2];
        default:
          break;
      }
    },
    ajouterPanier(nom, prix) {
      this.commande.push(nom);
      this.additionMenu.push(prix);
      this.repas.push([nom, prix]);
      this.totalPanier += prix;
      console.log("repas ajouté au panier");
    },
  },
  created() {
    this.midiEntree = this.randomPlat(this.entree);
    this.midiPlat = this.randomPlat(this.plat);
    this.midiDessert = this.randomPlat(this.dessert);
    this.gastroEntree = this.randomPlat(this.entree);
    this.gastroPlat = this.randomPlat(this.plat);
    this.gastroDessert = this.randomPlat(this.dessert);
  },
};
</script>

<style scoped>
template {
  width: 100%;
  height: 100%;
}
#firstDiv {
  width: 80%;
  box-shadow: 0px 0px 0px #414141;
  margin: 0 auto;
  background-color: white;
}

.menu-classic {
  padding: 40px 15px;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
}

.menu-classic .h6 {
  color: rgb(55, 0, 255);
}

.menu-classic .menu-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-classic .menu-item > span:first-of-type {
  display: flex;
  align-items: center;
  width: 100%;
}

.menu-classic .menu-item > span:first-of-type > * {
  flex: 0 0 auto;
}

.menu-classic .menu-item > span:first-of-type:after {
  content: "";
  display: inline-block;
  border-top: 1px dashed;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
}

.menu-classic .menu-item .price {
  white-space: nowrap;
}

.menu-classic .menu-item .price:before {
  content: "€";
  display: inline-block;
}

@media (min-width: 992px) {
  .menu-classic {
    padding: 40px 40px;
  }
  .menu-classic .list-menu li {
    padding-top: 22.5px;
    padding-bottom: 22.5px;
  }
}

.thumbnail-menu-modern .caption {
  max-width: 275px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2px;
}

.menu-classic-single {
  position: relative;
  max-width: none;
}

@media (min-width: 768px) {
  .menu-classic-single .list-menu {
    columns: 2;
    column-gap: 30px;
  }
  .menu-classic-single .list-menu li {
    break-inside: avoid;
  }
}

@media (min-width: 992px) {
  .menu-classic-single::after {
    position: absolute;
    top: 14px;
    bottom: 14px;
    right: 14px;
    left: 14px;
    content: "";
    display: inline-block;
    border: 1px solid;
    opacity: 0.6;
  }
  .menu-classic-single .list-menu {
    column-gap: 50px;
    z-index: 1;
  }
}
.menu-classic-single::before {
  background: rgba(0, 0, 0, 0.4);
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
@media (min-width: 1200px) {
  .menu-classic-single .list-menu {
    column-gap: 100px;
  }
}

.menu-classic{
  padding-top: 80px!important;
  margin-top: 56px;
}
</style>
