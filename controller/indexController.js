class indexController{
    index(req,res){
        res.render('ejs/index',{session:req.session});
    }

    session(req,res){
        res.send(req.session);
    }
}
module.exports=indexController;