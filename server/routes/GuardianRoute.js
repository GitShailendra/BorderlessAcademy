const express = require("express")
const router = express.Router();
const {registerGuardian} = require("../controllers/guardianController")
router.post("/",registerGuardian)

module.exports = router