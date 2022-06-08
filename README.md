# Ze Parcours JS S05 :zap:

---

## Bienvenue dans ce parcours qui vient clôturer la S05.

### Objectifs

-   Travailler dans du code existant, respecter des consignes et trouver sa place comme en entreprise.
-   S'y retrouver dans un code source avec une architecture que vous n'avez pas choisi.
-   S'adapter à un nouvel environnement
-   Valider les acquis :
    -   Sequelize,
        -   Relations (tables)
        -   Associations entre différentes tables :boom: :sweat:
        -   Création de modèles
    -   Les Sessions avec express-session
    -   Création de base de données
    -   Consolider les trucs `<%= bizarres %>` avec ejs :cold_sweat:

> Modifiez le code uniquement la ou vous y êtes invité.

### Le background

Cette application est une ébauche de site e-commerce avec quelques fonctionnalités, vous devrez lire le code et le modifier uniquement aux endroits indiqués.

### Le pitch :clapper:

Nous sommes en train de travailler sur le site E-commerce d'un client et nous n'avons pas assez de temps :crying_cat_face: pour terminer aujourd'hui. Nous avons donc besoin de votre aide pour finir ce sprint avant 12H05. :muscle:

Quelques fonctionnalités sont déjà codées et une partie de l'intégration a été réalisé, mais nous devons encore rendre une page dynamique (affichage des catégories et des produits) et implémenter une session utilisateur (login / logout) afin de réaliser une présentation à notre client cette après midi. :open_mouth:

Voici les routes fonctionnelles :

-   `/` Page d'accueil
-   `/shop` Affiche une page avec toutes les catégories et leurs produits associés.
-   `/category/:id` Affiche un page avec une catégorie et ses produits associés.
-   `/product/:id` Affiche le détail d'un produit
-   `/login` Affiche un formulaire de connexion.
-   `/profile` (Si connecté)
-   `/dashboard` (Si connecté ET admin)

Voici les pages sur lesquelles vous devrez travailler :

-   `/shop` Affiche les catégories et produits, nous devons terminer cette page
-   `/category/:id` Affiche une catégorie et les produits associés.
-   `/login` (GET / POST) Vous devrez finir le login.
-   En Bonus :smile: `/logout` (GET) Vous devrez faire le logout.
-   En Bonus :smile: `/register` (GET / POST) , si vous avez le temps, finir la création de compte.

## Installation de l'application

1.  Faire `npm install`.

### BDD

1.  Créer une base de données et un utilisateur ayant le droit de s'y connecter. (les bons souvenirs de la S04 :))

<details>
<summary>Je ne me rappelle plus trop des commandes...</summary>
    Un petit tour sur la fiche recap ? https://kourou.oclock.io/ressources/objectifs/creer-une-nouvelle-base-de-donnee-sur-postgresql/
</details>

2.  Copier le contenu du fichier `.env.example` dans un fichier `.env` que vous devrez créer, modifier la variables `PG_URL avec les informations nécessaires pour pouvoir vous connecter à la BDD.

### L'application

1. Démarrez l'application `npm run dev`
2. Aller sur [localhost:3000](http://localhost:3000)
3. Appréciez le travail de notre designer / intégrateur.

### Précisions :straight_ruler:

Il y a deux utilisateurs en DB :

1. John Example, email : example@example.com, mot de passe : password, role: customer
2. Maurice Admin, email: admin@admin.com, mot de passe: admin, role : admin

Il y a aussi trois produits, deux catégories et deux rôles dans la BDD.

Mis à part le fichier `.env`, vous n'aurez pas de nouveaux fichiers à créer, tout est là, il faut finir le travail.

Si des noms de variables sont proposés, conservez ces noms.

Ne changez pas les formats des URL de balises <a>, elles correspondent à des routes existantes et fonctionnelles. Rendez les dynamiques. ex : `/category/1` deviendra `/category/<%= category.id %>`

### Rappels

> **_Dans les méthodes `async`, utilisez `await`_** :eyes:

#### Vos tâches :construction_worker:

##### Résumé débrouillard

-   Dans le répertoire `app/models`, vous devrez créer les modèles Sequelize `Product` et `Category` dans les fichiers correspondants, et les associer (`belongsTo`, `hasMany`) dans le fichier `app/models/index.js`. Des commentaires dans les fichiers fournis vous aideront.

-   Vous devrez rendre la page `/shop` dynamique (fichier `shop.ejs`, `catalogController.js`). Vous devrez obtenir les catégories et les produits avec Sequelize, et rendre dynamique l'affichage des catégories dans la sidebar ainsi que l'affichage des produits. Des commentaires sont inclus dans les fichiers pour vous aider.

-   Vous devrez faire fonctionner le `login` (fichiers `login.ejs`, `sessionController.login`), des commentaires sont inclus dans le fichier `sessionController`, respectez bien scrupuleusement les étapes décrites. Les routes existent déjà (`/login` GET / POST)

-   Bonus : Faire fonctionner le bouton `logout` de `NavLinks.ejs` et du `header.ejs` du dashboard. (`sessionController.logout`), la route existe déjà `/logout`

-   Bonus : Finir la méthode `register` de `userController`. :fireworks:

#### Le guide (un peu) détaillé :point_down:

<details>
<summary>Cliquer ici pour en avoir plus</summary>

##### Étape 1 - Les modèles

Dans le répertoire `app/models`

-   Vous devrez compléter les Model Sequelize `Category` et `Product`
-   Vous devrez spécifier leurs associations respectives dans le fichier `app/models/index.js`
-   Des commentaires dans ces fichiers vous aideront
-   Si nécessaire, aidez vous également avec le fichiers de création de la base de données et des modèles existants.

Note : l'association entre les models n'est utilisée qu'à l'étape 6, si cette étape vous bloque, n'hésitez pas à la passer et à y revenir plus tard.

##### Étape 2 - Récupérer la liste des produits

Sur la page `/shop`, nous somme supposé avoir la liste des produits. Pour l'instant, elle  est écrite en dur dans le HTML avec des données d'exemple. Nous allons remédier à ça.

Dans la méthode `productsList` du controller `app/controllers/catalogController`, vous devrez faire appel à Sequelize pour récupérer la liste des produits, et les envoyer à la vue dans une variable `products`.

Dans un premier temps, on s'assure grâce à un `console.log(products)` que la variable `products` contient bien la liste des produits.  

##### Étape 3 - La vue de la liste des produits

Dans le fichier `app/views/shop.ejs`, nous allons rendre la liste des produits dynamique. Pour cela, nous allons boucler sur la liste des produits grâce à la variable `products`, afin de générer les `<div class="product">....</div>` pour chaque produit.

##### Étape 4 - Dynamiser la liste des catégories 

Dans la sidebar de la page `/shop`, il est prévu d'afficher la liste des catégories. Nous allons donc commencer par récupérer la liste des catégories dans la méthode `productsList` du controller `app/controllers/catalogController`, toujours grâce à Sequelize.

##### Étape 5 - La liste des catégories de la sidebar

Dans le fichier `app/views/shop.ejs`, nous allons rendre la liste des catégories dynamique. Pour cela, nous allons boucler sur la liste des catégories grâce à la variable `categories`, afin de générer les `<li><a href="/category/id">Categorie</a></li>` pour chaque catégorie.

##### Étape 6 - La page catégorie

Lors de l'étape précédente, nous avons généré des liens vers les pages `/category/id`. Pour l'instant cette page utilise des données en dur dans le HTML. Nous allons la rendre dynamique.

1. Pour commencer, nous allons compléter la méthode `category` du controller `app/controllers/catalogController` pour qu'elle récupère la catégorie demandée avec tous les produits qui lui sont associés (https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#fetching-all-associated-elements), et qu'elle les transfère à la vue dans une variable `category`.
1. Ensuite, nous allons modifier la vue `category.ejs` pour faire 2 choses : 
    - Afficher le nom de la catégorie (`categorie.name`)
    - Afficher les produits de la catégorie (`category.products`)


##### Étape 7 - Le login

Comme précisé plus haut, il y a des utilisateurs dans la BDD. On aimerait que ces utilisateurs puissent se connecter au site grâce à leur email et leur mot de passe.

Il faudra donc compléter la méthode `login` dans le fichier `app/controllers/sessionController.js`. Le formulaire est déjà fait, il envoie déjà les données via une requête POST. Ici l'objectif est de : 
- Récupérer ces données.
- Vérifier si l'email existe dans la base de données.
- Vérifier le mot de passe.
- Logguer l'utilisateur, c'est à dire enregistrer ses données en session.

##### Bonus 1 - Logout
Et oui mais, et si l'utilisateur veur se déconnecter ? Pour cela, terminer la fonctionnalité dans la méthode `logout` du fichier `sessionController.js`.

##### Bonus 2 :grey_exclamation::grey_exclamation: Register :astonished:

-   La route `/register` affiche un formulaire de création de compte, malheureusement Jean Louis, notre lead dev, a attrapé un rhume du cerveau et n'a pas pu finir cette fonctionnalité, dans le fichier `app/controllers/userController` il faut terminer la méthode `register`.

</details>

---

<details>
<summary>Enfin, voici l'architecture de notre application</summary>


```bash
.
├── app
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── appController.js
│   │   ├── cartController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── sessionController.js
│   │   └── userController.js
│   ├── database.js
│   ├── models
│   │   ├── Category.js
│   │   ├── index.js
│   │   ├── Product.js
│   │   ├── Role.js
│   │   └── User.js
│   ├── routers.js
│   └── views
│       ├── 401.ejs
│       ├── admin.ejs
│       ├── cart.ejs
│       ├── dashboard
│       │   ├── dashboard.ejs
│       │   └── partials
│       │       ├── head.ejs
│       │       ├── header.ejs
│       │       ├── quickActions.ejs
│       │       └── sidebar.ejs
│       ├── error.ejs
│       ├── index.ejs
│       ├── login.ejs
│       ├── partials
│       │   ├── foot.ejs
│       │   ├── head.ejs
│       │   ├── header.ejs
│       │   ├── nav.ejs
│       │   └── navlinks.ejs
│       ├── product.ejs
│       ├── register.ejs
│       └── shop.ejs
├── assets
│   ├── css
│   │   ├── app.css
│   │   └── dashboard.css
│   ├── favicon.ico
│   └── img
│       ├── 404.gif
│       ├── blog1.png
│       ├── blog2.png
│       ├── blog3.png
│       ├── kenshiro.jpg
│       ├── macbook-pro-laravel.png
│       ├── macbook-pro.png
│       └── triangles.svg
├── data
│   ├── shoppingcart-data.sql
│   └── shoppingcart-db.sql
├── index.js
├── install.js
├── middlewares
│   ├── auth.js
│   ├── cartCalculations.js
│   ├── errorHandlers.js
│   ├── initCart.js
│   └── isAdmin.js
├── package.json
├── package-lock.json
├── README.md
└── utils
    └── helpers.js
```


</details>

