const question_raws=require('./storage/seeds/exercise_question_mod.json');
const courses_raws=require('./storage/seeds/courses.json');
const answer_raws=require('./storage/seeds/answer.json');
const {Question,Answer,Course}=require('./models');

const data=question_raws[2].data;
const c1=courses_raws[2].data[0];
const answers_list=answer_raws[2].data;
const q1=question_raws[0];

(async function(){
    let course= await Course.findOne({where:{name:c1.courseName}});
    let courseID=course.id;
    let answers=answers_list.filter((a)=>a.questionID===q1.questionID);
    console.log({courseID,q1,answers})

})()

