const { DataTypes, Sequelize } = require('sequelize');
const People_Skill = require('./People_Skill');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});


const Company = require('./Company')(sequelize, Sequelize.DataTypes);
const Advertisement = require('./Advertisement')(sequelize, Sequelize.DataTypes);
const People = require('./People')(sequelize, Sequelize.DataTypes);
const Application = require('./Application')(sequelize, Sequelize.DataTypes);
const Skill = require('./Skill')(sequelize, Sequelize.DataTypes);
const PeopleSkills = require('./People_Skill')(sequelize, Sequelize.DataTypes);
const Role = require('./Role')(sequelize, Sequelize.DataTypes);
const ContractType = require('./ContractType')(sequelize, Sequelize.DataTypes);

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

// Advertisement.associate({ Company, Application, Skill });

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

  module.exports = {
    sequelize,
    Advertisement,
    Role,
    Company,
    Application,
    Skill,
    ContractType,
    People,
    People_Skill,
  };

