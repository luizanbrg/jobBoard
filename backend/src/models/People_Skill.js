const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class People_Skill extends Model{
  //Associations
    static associate(models) {
    }
  }

  People_Skill.init(
    {
      people_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      skills_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'People_Skill',  
      tableName: 'People_Skill',  // Spécifier le nom de la table
      underscored: true,
    }
  )

  return People_Skill;
};
