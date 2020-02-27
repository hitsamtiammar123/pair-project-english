const{Courses}=require("../models/index");
class Controller{

    index(req,res){
        Courses.findAll({
            includes:{questions}
        })
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.send(err)
        })
    }
    
    
}
module.exports=Controller;