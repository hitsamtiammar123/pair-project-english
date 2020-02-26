'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return Promise.all([
        queryInterface.addConstraint('UserCourses', ['userId'],{ 
            type: 'foreign key',
            name:'UserCourses_userId_fk',
            references: { 
              table: 'Users',
              field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'   
        }),
        queryInterface.addConstraint('UserCourses', ['courseId'],{ 
          type: 'foreign key',
          name:'UserCourses_courseId_fk',
          references: { 
            table: 'Courses',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'   
        }),
     ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return Promise.all([
      queryInterface.removeConstraint('UserCourses','UserCourses_userId_fk'),
      queryInterface.removeConstraint('UserCourses','UserCourses_courseId_fk')
     ]);
  }
};
