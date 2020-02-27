const express = require("express");
const router = express.Router();
const Controller = require("../controller/courseController");

const controller=new Controller();

router.get('/all',controller.all);
router.get('/detail/:id',controller.courseDetail);

module.exports=router;