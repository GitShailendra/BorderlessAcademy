const express = require('express');
const router = express.Router();

const {registerStudent,loginStudent,getStudentClasses}= require("../controllers/studentController")
const protectClass  = require('../middlewares/studentAuth')
router.post("/register",registerStudent)
router.post('/login',loginStudent)
router.get('/classes',protectClass,getStudentClasses)
module.exports = router
