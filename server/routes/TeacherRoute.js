const express = require("express")
const router = express.Router();
const {registerTeacher,loginTeacher,getTeacherClasses,createClass, getStudents} = require("../controllers/teacherController");
// const { protect } = require("../middlewares/authMiddleware");
const protectClass = require("../middlewares/auth");
router.post("/register",registerTeacher)
router.post('/login', loginTeacher);
router.get('/classes',protectClass,getTeacherClasses)
router.post('/classes/create',protectClass,createClass)
router.get('/students',protectClass,getStudents)
module.exports = router