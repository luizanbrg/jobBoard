const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model{
  //Associations
    static associate(models) {
      Skill.belongsTo(models.Advertisement, {
        foreignKey: 'advertisement_id',
        as: 'advertisement',
      });
      Skill.belongsToMany(models.People, {
        through: models.People_Skill,
        foreignKey: 'skills_id',
        as: 'people',
      });
    }
  }

  // Table
  Skill.init(
    {
      skill_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Skill',  
      tableName: 'Skill',  // Spécifier le nom de la table
      underscored: true,
    }
  )

  return Skill;
};
