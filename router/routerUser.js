const express=require("express")
const Controller=require('../controller/userController');
const authenticate=require('../middleware/authenticate');
const guest=require('../middleware/guest');

const router = express.Router();
const controller=new Controller();

router.use([
    '/logout',
    '/course',
    '/course/learn/:courseId',
    '/course/learn/:courseId/check']
    ,authenticate);

router.use(['/login','/create'],guest)

router.post('/create',controller.create);
router.post('/login',controller.login);
router.post('/logout',controller.logout);
router.get('/course',controller.myCourses);
router.get('/course/learn/:courseId',controller.learn);
router.post('/course/learn/:courseId/check',controller.check);

module.exports=router;