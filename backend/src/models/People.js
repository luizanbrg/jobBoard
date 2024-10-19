const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {
      People.hasMany(models.Application, { foreignKey: 'people_id', as: 'applications' });
      People.hasMany(models.Skill, { foreignKey: 'people_id', as: 'skills' });
      People.hasMany(models.Advertisement, { foreignKey: 'people_id', as: 'advertisement' });
      People.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    }
  }

  People.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Role',
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'People',
      tableName: 'People',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at', 
      updatedAt: 'updated_at',
    },
  );

  return People;
};
