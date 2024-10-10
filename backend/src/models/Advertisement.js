const { Model } = require('sequelize');
// const sequelize = require('../database'); 

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model{
  //Associations
    static associate(models) {
      Advertisement.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company',
      });
      Advertisement.hasMany(models.Application, {
        foreignKey: 'advertisement_id',
        as: 'applications',
      });
      Advertisement.hasMany(models.Skill, {
        foreignKey: 'advertisement_id',
        as: 'skills',
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
      salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      found: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Advertisement',  // Utiliser 'Advertisement' avec un 'A' majuscule
      tableName: 'Advertisement',  // Spécifier le nom de la table
      underscored: true,
    }
  )

  return Advertisement;
}