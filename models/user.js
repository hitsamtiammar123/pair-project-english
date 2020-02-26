'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;

  class User extends Model{}

  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('user','role')
  },{sequelize,modelName: 'User'});

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Course,{through:'UserCourse',foreignKey:'userId'})
  };
  return User;
};