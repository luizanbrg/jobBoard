# Job Board

### Comment nous avons travaillé:  
Ce projet appelé Job Board, effectué en duo, c'est le premier projet proposé à Epitech Nice. Conçu par Luiza Nobrega et Véronique Santi, nous avons eu deux semaines pour réaliser une page web d'un site proposant des offres d'emploi, ainsi que d'une dashboard permettant aux admins du site de réaliser des opérations CRUD sur les utilisateurs, les annonces d'emploi, les entreprises y registrées et les soumissions de candidatures. Les utilisateurs ont aussi la possibilité d'effectuer des opérations CRUD sur leurs profiles et les annonces d'emploi créés par eux mêmes, ainsi que de soummetre des candidatures à des postes ouverts.

Nous avons décidé ensemble de partir sur des technologies auxquelles nous ne maîtrisions pas encore, ou n'avions pas encore beaucoup d'expérience, tels que le Node.js pour le back-end et le React.js pour le front-end. Nous nous sommes organisées à travers d'un Trello [Jobboard](https://trello.com/b/mi4irua3/job-board) et chaque matin on révisait ensemble ce qui avait été fait la veille, et à partir de ce moment-là, nous décidions ce que chacune allait faire pendant la journée.

### Technologies
**Back-end**: Node.js, Express.js, Nodemon.

Node.js a été notre premier choix, car il s'agit d'une langage de programmation légère et qui possède une communauté massive, ce qui est essentiel afin de trouver assez de contenu en ligne permettant de nous aider. De plus, avec Express.js comme framework de Node.js, le système de routages de l'application est simplifié et nous pouvons mettre en place des middlewares. Pour installer Express.js, écrivez `npm install express` sur le terminal.
Nous avons choisi de travailler avec Nodemon server, car cette outil permet d'optimiser le travail sur Node.js, puisqu'il réeinitialise le serveur automatiquement lorsqu'un changement est effectué, évitant ainsi le test de l'application en quelques secondes. 
Pour l'installer, il suffit d'écrire `npm install nodemon` sur le terminal.

**Front-end**: React.js, Tailwind CSS

Nous avons choisi React.js pour le côté front-end, car il permet la réutilisation et la modification des composants utilisés pour créer des interfaces utilisateur, et ces éléments peuvent être assemblés et appelés plusieurs fois sans la nécessité de recharger la page entière. De plus, ce framework fonctionne très bien avec Node.js et possède également une grande  communauté et diverses sources en ligne pour nous aider pendant le développement du projet. 
Pour le style, nous sommes parties sur le framework CSS Tailwind grâce à son réutilisabilité.

**Base de données**: MySQL

MySQL est une base de données relationnelle, open-source et d'utilisation facile. Avec l'ajout de Sequelize en tant qu'ORM, il était facile d'effectuer des rêquetes, créer les relations et ajouter des tables et/ou colonnes.
Nous avons 8 tables:
- People : les utilisateurs, qu'ils soient admins ou non.
- Role : table utilisé pour définir si un 'people' était un admin ou non.
- people_skills: Table de jointure entre people et skills, pour pouvoir rentrer les compétences d'un utilisateur à travers d'IDs
- Skills: Table utilisé afin de générer les IDs des compétences utilisateur (langages de programmation, technologies etc...) afin de pouvoir rentrer ces données facilement dans les annonces (advertisements) ainsi que dans les profils utilisateur.
- Applications: table de jointure entre people et advertisement, pour définir si un utilisateur avait déjà postulé pour un annonce.
- Companies: Table utilisée pour rentrer les entreprises qui possedaient des annonces sur le site.
- Advertisements: Les annonces d'emploi
- Contract_type: Table utilisé pour générer les IDs pour les types différents de contrat (CDI, CDD..) afin de pouvoir les rentrer facilement dans les annonces par leurs IDs.


**Organisation**: [Trello Jobboard](https://trello.com/b/mi4irua3/job-board), [DrawSQL Jobboard](https://drawsql.app/teams/serverteam/diagrams/jobboard) 


### Packages installés
**Côté back-end:**
- Bcrypt: Utilisé pour le hashage des mots de passe utilisateur, afin de réforcer la sécurité des informations utilisateur. Le hashage est fait 10 fois.
- Cors: Pour éviter les erreurs de Cross Origin, car dès lorsque l'on travaille sur deux serveurs différents (l'un pour le côté back et l'autre pour le côté front, les navigateurs modernes, par mésure de sécurité, n'acceptent pas les rêquetes). Une configuration supplémentaire est donc nécessaire afin d'éviter les blocages.
- Dotenv: Pour cacher les variables d'environnement, ce package permet de ne pas exposer des données sensibles sur GitHub, lié au fichier _.gitignore_
- Express: Le Framework de Node.js
- Jsonwebtoken: Pour garantir que nos utilisateurs soient authentifiés avant de pouvoir effectuer certaines opérations CRUD et/ou avoir accès à certaines pages de l'application, nous avons opté pour utiliser ce package, qui génère un token garantissant l'identité de l'utilisateur. Nous avons opté pour un token qui s'expire au bout de 24 heures.
- Multer: Pour gérer l'envoi d'images des utilisateurs, afin de pouvoir rentrer le logo des entreprises.
- Mysql2: Base de données relationnelle
- Nodemailer : Utilisé pour l'envoi automatique d'un e-mail à l'admin lorsqu'un utilisateur postule pour une annonce.
- Parse-json : Pour transformer les strings en JSON, afin de pouvoir traiter les images
- Sequelize : ORM de MySQL

**Côté front-end:**
- React : Framework JavaScript
- React-dom : C'est le lien entre le DOM virtuel de React et le DOM du navigateur, afin de restituer les composants React dans le DOM.
- React-router-dom : Système de routes pour le front-end utilisé avec React afin de gérer les routes et créer des liens pour pouvoir naviguer entre différentes pages

### Routes API
Les routes de cette API ont été conçues pour gérer différentes entités principales de l'application, notamment les annonces, les utilisateurs, les candidatures, et les entreprises. Voici une explication des principales routes utilisées :

1. Routes pour les annonces (/api/advertisements)

Ces routes permettent la gestion des annonces postées sur la plateforme. Chaque route est protégée par un middleware d'authentification auth pour s'assurer que seules les personnes autorisées peuvent créer, modifier ou supprimer des annonces.

- GET /advertisements : Récupère toutes les annonces disponibles (authentification requise).
- POST /advertisements : Crée une nouvelle annonce.
- GET /advertisements/:id : Récupère les détails d'une annonce spécifique.
- PUT /advertisements/:id : Met à jour une annonce existante.
- DELETE /advertisements/:id : Supprime une annonce donnée.

2. Routes pour les utilisateurs (/api/account)

Ces routes gèrent les informations des utilisateurs et leurs actions d'inscription et de connexion. Les actions sensibles, comme la suppression ou la modification de comptes, nécessitent une vérification de propriété pour s'assurer que seuls les utilisateurs concernés peuvent effectuer ces actions.

- POST /signup et POST /login : Gèrent l'inscription et la connexion des utilisateurs.
- GET /account/:id : Récupère les informations d'un utilisateur par son ID.
- PUT /account/:id : Met à jour les informations d'un utilisateur.
- DELETE /account/:id : Supprime un utilisateur.

3. Routes pour les candidatures (/api/apply)

Ces routes permettent de gérer les candidatures soumises par les utilisateurs pour diverses annonces.

- POST /apply/create : Crée une nouvelle candidature.
- GET /apply/list : Récupère toutes les candidatures.
- GET /apply/show/:id : Récupère une candidature spécifique.
- DELETE /apply/:id : Supprime une candidature donnée.

4. Routes pour les entreprises (/api/company)

Ces routes gèrent les informations des entreprises publiant des annonces sur la plateforme.

- POST /company/create : Crée une nouvelle entreprise.
- GET /company/list : Récupère toutes les entreprises.
- GET /company/show/:id : Récupère une entreprise spécifique.
- PUT /company/update/:id : Met à jour les informations d'une entreprise.
  
5. Routes pour les types de contrats (/api/contract-types)

Cette route permet de récupérer tous les types de contrats disponibles, afin de faciliter la gestion des annonces d'emploi en lien avec des contrats spécifiques.
- GET /contract-types : Récupère la liste des types de contrats depuis la base de données.

Une route admin différente a été faite pour gérer les opérations CRUD des annonces, nécessitant d'une authentification afin de garantir la sécurité.
Certaines routes ont un middleware d'authentification, d'autres ont également un middleware qui vérifie si l'utilisateur est admin ou le créateur de cette route (ex: routes des annonces, qui peuvent être modifiés seulement par les admins ou l'utilisateur qui les a créées).

### Middlewares
- auth: Il s'agit du middleware responsable pour vérifier le token de l'utilisateur, ainsi que pour assigner l'id de cet utiliqateur et son role à sa session, afin de lui garantir les droits nécessaires.
- checkAdvertisementOwnership / checkPeopleOwnership : middleware utilisé pour garantir qu'une annonce ou un profil pourront être modifiés seulement par un adin ou l'utilisateur qui l'a créé. Le middleware compare l'id utilisateur stocké dans la session avec celui de l'utilisateur qui a créé l'annonce/profil dans la base de données, et si cet id est différent, ou si l'utilisateur ne possède pas un role_id d'admin, l'accès est réfusé.
- checkCompanyOwnership : même principe du middleware précédant, mais celui ci est responsable seulement pour vérifier si le role_id gardé dans la session est égal au role_id d'un admin, afin de garantir ou pas l'accès aux opérations CRUD.

## Comment installer notre projet ?

L'installation de notre API nécessite l'installation de Node.js et de npm (Node Package Manager). Pour configurer le projet localement, suivez ces étapes: 

**Prérequis**
- Node.js (version 14 ou supérieure) : Vous pouvez le télécharger et l'installer depuis [Nodejs.org](nodejs.org).
- npm : Normalement installé avec Node.js.

**Étapes d'installation**
1. Cloner le projet : Clonez ce dépôt sur votre machine locale avec la commande suivante : `git clone git@github.com:luizanbrg/jobBoard.git`
2. Acceder au répértoire du projet `cd jobBoard`
3. Installer toutes les dépendances du projet: `npm install`
4. Configurer la base de données (assurez-vous que MySQL soit installé)
5. Lancer l'application: démarrez le serveur avec la commande: `npm start` pour le front-end et `nodemon serve` pour le back-end. L'API sera alors disponible sur http://localhost:3000
6. Tester les routes: Vous pouvez utiliser un outil comme Postman pour tester les différentes routes de l'API. 
