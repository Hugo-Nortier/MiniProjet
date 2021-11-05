# MiniProjet Technologies Web - M1 Miage 2021-2022 

#### Développé par : NORTIER Hugo

------------

## Components développées :

- ListeDesRestaurants.vue : Tableau de restaurants mis en forme avec VueMaterial
- Restaurant.vue : Affichage des détails d'un restaurant en particulier (info, note, photo, carte de géolocalisation et accès menu)
- InsererRestaurant : Formulaire d'insertion d'un restaurant qui vient d'ouvrir ses portes
- Menu.vue : Affiche le menu du midi et le menu gastronomique d'un restaurant particulier
- Panier.vue : Récapitulatif des menus ajoutés au panier depuis Menu.vue avec gestion de ces dits menus

## Fonctionnalités :

> Dans ListeDesRestaurants:
- Consulter la liste des restaurants selon, leur nom ou leur type de cuisine ou leur ville de localisation
- Régler la quantité de restaurants à afficher par page dans le tableau
- Naviguer de page en page
- Possibilité d'en savoir plus sur un restaurant en particulier (bouton ramenant à Restaurant.vue)

> Dans la navigation  de ListeDesRestaurants:
- Accès aux outils "admin": formulaire d'insertion de restaurant et suppression de restaurant
- Accès aux filtres par type de cuisine: pizza, burger, salade, sandwich et donuts pour plus de rapidité d'exécution

> Dans Restaurant:
- Géolocaliser le restaurant grâce à Leaflet 
- Observer une photo aléatoire du restaurant grâce à l'API pixabay
- Accéder à son menu

> Dans Menu:
- Générer un menu du midi et un menu gastronomique comportant des plats pris au hasard parmi un tableau d'entrées, un tableau de plats et un tableau de desserts. Ces tableaux comportent un titre, une description et un prix.  
- Ajouter au panier un menu via des paramètres passés dans la route

> Dans Panier:
- Dupliquer un menu si on souhaite le commander pour plusieurs personnes
- Supprimer un menu si on ne souhaite plus manger cela
- Consulter le tarif du panier, mis à jour automatiquement

## Points remarquables :
- [x] Mon système de filtre par cuisine, nom ou ville ainsi que mon filtre "gain de temps" dans le menu de navigation  
- [x] Mon formulaire d'insertion performant qui ne s'arrête pas simplement à renseigner un simple nom et type de cuisine
- [x] Mes délicieux menus aléatoires avec sa carte sublimée par le CSS

<u>Consultez ma [vidéo de l'explication de ces points remarquables](https://www.youtube.com/watch?v)</u>

------------


## Lancer le projet
- Dans un 1er terminal
```bash
$ mongod
```
- Dans un 2ème terminal
```bash
$ cd serveur
$ npm i
$ node .\serverCrudWithMongo.js
```
- Dans un 3ème terminal
```bash
$ cd miniprojet
$ npm i
$ npm run serve
```
