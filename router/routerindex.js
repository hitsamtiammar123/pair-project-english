const express=require("express");
const Controller=require('../controller/indexController');
const router = express.Router();

const controller=new Controller();

router.get('/',controller.index);
router.get('/session',controller.session);

module.exports=router;