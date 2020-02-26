'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model=sequelize.Sequelize.Model;

  class Answer extends Model{}

  Answer.init({
    questionId: DataTypes.INTEGER,
    question: DataTypes.TEXT,
    isTruAnswer: DataTypes.BOOLEAN
  }, {sequelize,modelName:'Answer'})


  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.Question,{foreignKey:'questionId'})
  };
  return Answer;
};