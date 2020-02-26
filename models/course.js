'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;

  class Course extends Model{}

  Course.init({
    name: DataTypes.STRING,
    summary: DataTypes.TEXT,
    detail: DataTypes.TEXT
  }, {sequelize,modelName: 'Course'})

  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsToMany(models.User,{through:'UserCourse',foreignKey:'courseId'});
    Course.hasMany(model.Question,{foreignKey:'courseId'})
  };
  return Course;
};