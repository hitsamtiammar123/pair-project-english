const question_raws=require('./storage/seeds/exercise_question_mod.json');
const courses_raws=require('./storage/seeds/courses.json');
const answer_raws=require('./storage/seeds/answer.json');

const {Question,Answer,Course}=require('./models');

const answers_list=answer_raws[2].data;

(async function(){
    let qID=1;
    let aID=1;
    for(let i=0;i<question_raws.length;i++){
        let q1=question_raws[i];
        let course= await Course.findOne({where:{name:q1.courseName}});
        let courseID=course.id;
        let answers=answers_list.filter((a)=>a.questionID===q1.questionID)
        for(let i=0;i<answers.length;i++){
            let answer=answers[i];
            if(answer.chooice===q1.rightAnswer){
                answer.isTru=true;
            }
            else
                answer.isTru=false;
        }
    
        let qObj={};
        
        qObj.question=q1.question;
        qObj.courseId=courseID;
        qObj.answers=answers

        try{
            await Question.create({
                id:qID,
                courseId:qObj.courseId,
                question:qObj.question
            });
        }catch(err){
            console.log('Ada error di question ',err);
            process.exit(-1);
        }


        for(let j=0;j<qObj.answers.length;j++){
            let a=qObj.answers[j];
            try{
                await Answer.create({
                    id:aID,
                    questionId:qID,
                    answer:a.answer,
                    isTruAnswer:a.isTru
                })
            }catch(e){
                console.log('Ada error di answer',e);
                process.exit(-1);
            }
            aID++;

        }
        console.log('Berhasil menambahkan q dengan ID '+qID)
        qID++;
    }




    console.log(qObj)

})()

