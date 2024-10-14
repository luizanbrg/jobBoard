const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContractType extends Model{
    //Associations
      static associate(models) {
        ContractType.hasMany(models.ContractType, {
          foreignKey: 'advertisement_id',
          as: 'advertisements',
        });
      }
    }

    ContractType.init(
      {
        cdd: {
          type: DataTypes.STRING,
        },
        cdi: {
          type: DataTypes.STRING,
        },
        part_time: {
          type: DataTypes.STRING,
        },
        alternance: {
          type: DataTypes.STRING,
        },
        internship: {
          type: DataTypes.STRING,
        },
        freelance: {
          type: DataTypes.STRING,
        },
        full_time: {
          type: DataTypes.STRING,
        }
      },
      {
        sequelize,
        modelName: 'ContractType',  
        tableName: 'ContractType',  // Spécifier le nom de la table
        underscored: true,
      }
    )

  return ContractType;
};
