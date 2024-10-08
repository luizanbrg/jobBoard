const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error('sequelize instance is required');
  }

  const Company = sequelize.define('Company', {
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
  });
  Company.associate = (models) => {
    Company.hasMany(models.Advertisement, {
      foreignKey: 'company_id',
      as: 'advertisements',
    });
  };

  return Company;
};