const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Advertisement = sequelize.define('Advertisement', {
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
  });

  Advertisement.associate = (models) => {
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
  };

  return Advertisement;
};
