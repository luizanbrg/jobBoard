const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const Company = require('./models/Company')(sequelize);
const Advertisement = require('./models/Advertisement')(sequelize);
const People = require('./models/People')(sequelize);
const Application = require('./models/Application')(sequelize);
const Skill = require('./models/Skill')(sequelize);
const PeopleSkills = require('./models/People_Skill')(sequelize);
const Role = require('./models/Role')(sequelize);
const ContractType = require('./models/ContractType')(sequelize);

// Initialiser les associations
const models = {
  Company,
  Advertisement,
  People,
  Application,
  Skill,
  PeopleSkills,
  Role,
  ContractType,
};

// Appeler les associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Tester la connexion et synchroniser les modèles
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('success connexion db');
  } catch (error) {
    console.error('error', error);
  }
}

testConnection();

// Synchronisation des modèles avec la base de données
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Les tables ont été synchronisées.');
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation :', err);
  });

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.get('offers', (req, res, next) => {
//   Advertisement.find()
//     .then(advertisements => res.status(200).json(advertisements))
//     .catch(error => res.status(400).json({ error }));
// });

app.use((req, res) => {
  res.json({ message: 'ça marche' });
});

module.exports = app;
