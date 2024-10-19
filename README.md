# Job Board

### Comment nous avons travaillé:  
Ce projet appelé Job Board, effectué en duo, c'est le premier projet proposé à Epitech Nice. Conçu par Luiza Nobrega et Véronique Santi, nous avons eu deux semaines pour réaliser une page web d'un site proposant des offres d'emploi, ainsi que d'une dashboard permettant aux admins du site de réaliser des opérations CRUD sur les utilisateurs, les annonces d'emploi, les entreprises y registrées et les soumissions de candidatures. Les utilisateurs ont aussi la possibilité d'effectuer des opérations CRUD sur leurs profiles et les annonces d'emploi créés par eux mêmes, ainsi que de soummetre des candidatures à des postes ouverts.

Nous avons décidé ensemble de partir sur des technologies auxquelles nous ne maîtrisions pas encore, ou n'avions pas encore beaucoup d'expérience, tels que le Node.js pour le back-end et le React.js pour le front-end. Nous nous sommes organisées à travers d'un Trello [Jobboard](https://trello.com/b/mi4irua3/job-board) et chaque matin on révisait ensemble ce qui avait été fait la veille, et à partir de ce moment-là, nous décidions ce que chacune allait faire pendant la journée.

### Technologies
**Back-end**: Node.js, Express.js, Nodemon.

Node.js a été notre premier choix, car il s'agit d'une langage de programmation légère et qui possède une communauté massive, ce qui est essentiel afin de trouver assez de contenu en ligne permettant de nous aider. De plus, avec Express.js comme framework de Node.js, le système de routages de l'application est simplifié et nous pouvons mettre en place des middlewares. Pour installer Express.js, écrivez `npm install express` sur le terminal.
Nous avons choisi de travailler avec Nodemon server, car cette outil permet d'optimiser le travail sur Node.js, puisqu'il réeinitialise le serveur automatiquement lorsqu'un changement est effectué, évitant ainsi le test de l'application en quelques secondes. 
Pour l'installer, il suffit d'écrire `npm install nodemon` sur le terminal.

**Front-end**: React.js

Nous avons choisi React.js pour le côté front-end, car il permet la réutilisation et la modification des composants utilisés pour créer des interfaces utilisateur, et ces éléments peuvent être assemblés et appelés plusieurs fois sans la nécessité de recharger la page entière. De plus, ce framework fonctionne très bien avec Node.js et possède également une grande  communauté et diverses sources en ligne pour nous aider pendant le développement du projet. 

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
- Mysql2: Notre base de données 
- Nodemailer
- Parse-json
- Sequelize

**Côté front-end:**
- React
- React-dom
- React-router-dom

### Routes

### Middlewares

## Comment installer notre projet ?

