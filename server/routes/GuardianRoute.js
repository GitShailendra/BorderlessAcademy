const express = require("express")
const router = express.Router();
const {registerGuardian} = require("../controllers/guardianController")
router.post("/register",registerGuardian)

module.exports = router