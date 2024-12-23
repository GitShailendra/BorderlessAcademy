const express = require("express")
const router = express.Router();
const {registerGuardian,login} = require("../controllers/guardianController")
router.post("/register",registerGuardian)
router.post('/login',login)
module.exports = router