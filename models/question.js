'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model=sequelize.Sequelize.Model;

  class Question extends Model{}

  Question.init({
    courseId: DataTypes.INTEGER,
    question: DataTypes.TEXT
  }, {sequelize,modelName:'Question'})


  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.Course,{ foreignKey: 'courseId' });
    Question.hasMany(models.Answer,{foreignKey:'questionId'})

  };
  return Question;
};