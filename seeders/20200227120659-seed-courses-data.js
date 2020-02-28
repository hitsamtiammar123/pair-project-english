'use strict';
const fs=require('fs');
const path=require('path');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    //console.log(data[2].data);
    const data=require('../storage/seeds/courses.json');
    const summary_file=path.join(__dirname,'../storage/summary.html/');
    const summary_text_file=path.join(__dirname,'../storage/summary.txt/');
    const summary_detail_file=path.join(__dirname,'../storage/summaryDetail/');

    let raws=data[2].data;
    let result=[];

    for(let i=0;i<raws.length;i++){
      let raw=raws[i];
      let obj={};
      let stripName=raw.courseName.toLowerCase().replace(/\s+/g,'-');
      let sf=summary_file+stripName+'.html';
      let stf=summary_text_file+stripName+'.txt';
      let sdf=summary_detail_file+stripName+'.html';

      obj.name=raw.courseName;
      obj.summary=fs.readFileSync(sf,'utf-8');
      obj.summary_text=fs.readFileSync(stf,'utf-8');
      obj.detail=fs.readFileSync(sdf,'utf-8');
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
