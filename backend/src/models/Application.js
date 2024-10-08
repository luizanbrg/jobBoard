const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Application = sequelize.define('Application', {
    mail_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Application.associate = (models) => {
    Application.belongsTo(models.People, {
      foreignKey: 'people_id',
      as: 'applicant',
    });
    Application.belongsTo(models.Advertisement, {
      foreignKey: 'advertisement_id',
      as: 'advertisement',
    });
  };

  return Application;
};
