const{Course}=require("../models/index");
class Controller{

    index(req,res){
       
    }

    all(req,res){
        Course.findAll()
        .then((courses)=>res.render('ejs/courses',{session:req.session,courses}))
        .catch((err)=>res.send(err))
    }

    courseDetail(req,res){
        let id=Number(req.params.id);
        Course.findByPk(id)
        .then((course)=>res.render('ejs/course-detail',{session:req.session,course}))
        .catch((err)=>res.send(err))
    }
    
}
module.exports=Controller;