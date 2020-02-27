const {User,Course}=require('../models');

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
            if(result){
                req.session.user={
                    email

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
            where:{
                email
            }
        })
        .then((user)=>{
            user.getCourses()
            .then((courses)=>{
                res.render('ejs/my-course',{session:req.session,user,courses})
            })
            .catch((err)=>res.send(err))
            
        })
        .catch((err)=>res.send(err))
       
    }

}
module.exports=userController;