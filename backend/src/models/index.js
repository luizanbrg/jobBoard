const { DataTypes, Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const Company = require('./Company')(sequelize);
const Advertisement = require('./Advertisement')(sequelize,Sequelize.DataTypes);
const People = require('./People')(sequelize);
const Application = require('.//Application')(sequelize);
const Skill = require('./Skill')(sequelize);
const PeopleSkills = require('./People_Skill')(sequelize);
const Role = require('./Role')(sequelize);
const ContractType = require('./ContractType')(sequelize);

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
    Company,
    Application,
    Skill,
  };
