const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PeopleSkills = sequelize.define('PeopleSkills', {
    people_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    skills_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });

  return PeopleSkills;
};
