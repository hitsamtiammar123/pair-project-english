const{Course,Question,Answer,UserCourse}=require("../models/index");
class Controller{

    index(req,res){
       
    }

    quiz(req,res){
        let id=Number(req.params.id);
        (async function(){
            let course=null;
            try{
                course=await Course.findByPk(id,{
                    attributes:['id','name'],
                    include:{
                        model:Question,
                        attributes:['id','question'],
                        include:{
                            attributes:['id','answer'],
                            model:Answer
                        }
                    }
                })
                res.render('ejs/partial/quiz',{course:JSON.stringify(course)});
            }catch(err){
                res.send(err);
            }

        })();
    }

    all(req,res){
        (async function(){
            let courses=[];
            try{
                courses= await Course.findAll();
                res.render('ejs/courses',{session:req.session,courses}) 
            }catch(err){
                res.send(err)
            }
        })()
    }

    courseDetail(req,res){

        (async function(){
            let id=Number(req.params.id);
            let course=null;
            let userId=req.session.user?req.session.user.id:null;

            try{
                course= await Course.findByPk(id);
                let check=userId?await UserCourse.checkIfUserAlreadyTaken(userId,id):false;
                res.render('ejs/course-detail',{session:req.session,course,check})
            }catch(e){
                res.send(e)
            }
            

        })()

    }
    
}
module.exports=Controller;