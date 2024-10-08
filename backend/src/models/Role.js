const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define('Role', {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    users: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recruiter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Role.associate = (models) => {
    Role.hasMany(models.People, {
      foreignKey: 'role_id',
      as: 'roleUsers',
    });
  };

  return Role;
};
