const {User,Course,Answer,UserCourse}=require('../models');

class userController{

    create(req,res){
        User.hash(req.body.password)
        .then((resultHash)=>{
            let inputs=User.validateInput(req.body);
            User.create({
                name:inputs.name,
                username:inputs.username,
                email:inputs.email,
                role:inputs.role,
                password:resultHash
            })
            .then(()=>res.redirect('/'))
            .catch((err)=>res.send(err))
        })
        .catch((err)=>res.send(err));
    }

    login(req,res){
        let password=req.body.password;
        let email=req.body.email;
        User.checkHash(email,password)
        .then((result)=>{
            if(result.result){
                req.session.user={
                    email,
                    id:result.user.id
                }
            }
            res.redirect('/user/course');

        })
        .catch((err)=>{
            res.send(err)
        })
    }

    logout(req,res){
        req.session.user=null;
        res.redirect('/');
    }

    myCourses(req,res){
        let email=req.session.user?req.session.user.email:'';
        User.findOne({
            include:{
                model:Course
            },
            where:{
                email
            }
        })
        .then((user)=>{
            res.render('ejs/my-course',{session:req.session,user})
            //res.send(user);
            
        })
        .catch((err)=>res.send(err))
       
    }

    learn(req,res){

        (async function(){
            let id=Number(req.params.courseId);
            let userId=req.session.user.id;
            try{
                let checkCourse=await UserCourse.findOne({
                    where:{courseId:id,userId}
                });
                if(!checkCourse){
                    await UserCourse.create({courseId:id,userId,score:0})
                }

                let course=await Course.findByPk(id)
                res.render('ejs/course-learn',{session:req.session,course})
            }catch(e){
                res.send(err)
            }
        })()
        
    }

    check(req,res){
        //res.send(req.body);
        (async function(){
            let answers=req.body.answers;
            let result={};
            let countTrue=0;
            let countFalse=0;
            let countEmpty=0;
            let userId=req.session.user.id;
            let courseId=req.params.courseId;

            result.numberOfQuestion=Number(req.body.numberOfQuestion);

            for(let i=0;i<answers.length;i++){
                let answer=answers[i];
                let checkAnswer=null;

                try{
                    checkAnswer=await Answer.findByPk(answer.answer);                    
                }catch(err){
                    res.send(err);
                    return;
                }

                if(checkAnswer.isTruAnswer)
                    countTrue++;
                else
                    countFalse++;
                
            }
            countEmpty=result.numberOfQuestion-(countTrue+countFalse);
            result.countTrue=countTrue;
            result.countFalse=countFalse;
            result.countEmpty=countEmpty;
            result.score=Math.floor(countTrue/result.numberOfQuestion*100);

            try{
                await UserCourse.update({
                    score:result.score
                },{where:{
                    userId:userId,
                    courseId:courseId

                }})
            }catch(e){
                //console.log('Ada error saat masukin nilai');
                //res.send(err);
            }

            res.render('ejs/partial/quiz-result',{result});
        })();
    }

}
module.exports=userController;