'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    //console.log(data[2].data);
    const data=require('../storage/seeds/courses.json');
    let raws=data[2].data;
    let result=[];

    for(let i=0;i<raws.length;i++){
      let raw=raws[i];
      let obj={};
      obj.name=raw.courseName;
      obj.createdAt=new Date();
      obj.updatedAt=new Date();
      result.push(obj);
    }
   

    return queryInterface.bulkInsert('Courses', result, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Courses', null, {});
  }
};
