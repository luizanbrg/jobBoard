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
        Application.belongsTo(models.Company, {
          foreignKey: 'company_id',
          as: 'company',
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
          unique: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
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
