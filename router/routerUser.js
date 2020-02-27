const express=require("express")
const router = express.Router();
const Controller=require('../controller/userController');

const controller=new Controller();

router.post('/create',controller.create);
router.post('/login',controller.login);
router.post('/logout',controller.logout);
router.get('/course',controller.myCourses);

module.exports=router;