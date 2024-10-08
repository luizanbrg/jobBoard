const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ContractType = sequelize.define('ContractType', {
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
    },
  });

  return ContractType;
};
