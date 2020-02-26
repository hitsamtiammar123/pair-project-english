'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.addConstraint('Answers', ['questionId'],{ 
        type: 'foreign key',
        name:'Answers_questionId_fk',
        references: { 
          table: 'Questions',
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

      
    */
    return queryInterface.removeConstraint('Answers','Answers_questionId_fk');
  }
};
