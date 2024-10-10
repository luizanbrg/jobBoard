const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model{
    //Associations
    static associate(models) {
      Company.hasMany(models.Advertisement, {
        foreignKey: 'company_id',
        as: 'advertisements',
      });
    }
  }

  //Table
  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Company', 
      tableName: 'Company',  // Spécifier le nom de la table
      underscored: true,
    }
  )

  return Company;
};