const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const People = sequelize.define('People', {
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  People.associate = (models) => {
    People.hasMany(models.Application, {
      foreignKey: 'people_id',
      as: 'applications',
    });
    People.belongsToMany(models.Skill, {
      through: models.PeopleSkills,
      foreignKey: 'people_id',
      as: 'skills',
    });
  };

  return People;
};
