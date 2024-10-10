const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Role.associate = models => {
    Role.hasMany(models.People, {
      foreignKey: 'role_id',
      as: 'users',
    });
  };

  return Role;
};