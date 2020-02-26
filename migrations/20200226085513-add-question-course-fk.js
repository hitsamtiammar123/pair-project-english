'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.addConstraint('Questions', ['courseId'],{ 
          type: 'foreign key',
          name:'Questions_courseId_fk',
          references: { 
            table: 'Courses',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'   
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.removeConstraint('Questions','Questions_courseId_fk');
  }
};
