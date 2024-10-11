const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Application extends Model{
    //Associations
      static associate(models) {
        Application.belongsTo(models.People, {
          foreignKey: 'people_id',
          as: 'applicant',
        });
        Application.belongsTo(models.Advertisement, {
          foreignKey: 'advertisement_id',
          as: 'advertisement',
        });
      }
    }

    // Table
    Application.init(
      {
        mail_sent: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Application',  
        tableName: 'Application',  // Spécifier le nom de la table
        underscored: true,
      }
    )

  return Application;
};
