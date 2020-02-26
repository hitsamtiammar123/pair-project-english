'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;

  class UserCourse extends Model{}

  UserCourse.init( {
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  },{sequelize,modelName: 'UserCourse'})

  UserCourse.associate = function(models) {
    // associations can be defined here
    UserCourse.belongsTo(models.User,{ foreignKey: 'userId' });
    UserCourse.belongsTo(models.Course,{ foreignKey: 'courseId' });
  };
  return UserCourse;
};