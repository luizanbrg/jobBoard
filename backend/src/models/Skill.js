const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Skill = sequelize.define('Skill', {
    skill_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Skill.associate = (models) => {
    Skill.belongsTo(models.Advertisement, {
      foreignKey: 'advertisement_id',
      as: 'advertisement',
    });
    Skill.belongsToMany(models.People, {
      through: models.PeopleSkills,
      foreignKey: 'skills_id',
      as: 'people',
    });
  };

  return Skill;
};
