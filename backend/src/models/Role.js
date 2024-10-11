const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model{
    //Associations
      static associate(models) {
        Role.hasMany(models.People, {
          foreignKey: 'role_id',
          as: 'users',
        });
      }
  }

  // Tables
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Role',  
      tableName: 'Role',  // Spécifier le nom de la table
      underscored: true,
    }
  )

  return Role;
};