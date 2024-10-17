const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContractType extends Model{
    //Associations
      static associate(models) {
        ContractType.hasMany(models.Advertisement, {
          foreignKey: 'contract_type_id',
          as: 'advertisements',
        });
      }
    }

    ContractType.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
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
