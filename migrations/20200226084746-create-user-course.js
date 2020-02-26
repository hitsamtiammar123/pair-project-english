'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserCourses', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      score: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserCourses');
  }
};