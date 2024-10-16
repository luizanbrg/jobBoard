const { Model } = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    //Associations
    static associate(models) {
      Advertisement.belongsTo(models.People, {
        foreignKey: 'people_id',
        as: 'people',
      });
      Advertisement.hasMany(models.Application, {
        foreignKey: 'advertisement_id',
        as: 'applications',
      });
      Advertisement.hasMany(models.Skill, {
        foreignKey: 'advertisement_id',
        as: 'skills',
      });
      Advertisement.belongsTo(models.ContractType, {
        foreignKey: 'contractType_id',
        as: 'contractType',
      });
    }
  }

  Advertisement.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      wages: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      working_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      experiences: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      contract_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      found: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Advertisement', // Utiliser 'Advertisement' avec un 'A' majuscule
      tableName: 'Advertisement', // Spécifier le nom de la table
      underscored: true,
    },
  );

  return Advertisement;
};
