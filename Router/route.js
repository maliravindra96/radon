const express = require("express")

const controller = require("../Controller/collegeController")
const internController = require("../Controller/internController")

const router = express.Router()

// Create College API
router.post("/functionup/colleges", controller.createCollege)

// Create Intern API
router.post("/functionup/interns", internController.createIntern)

// Get Intern With College Name
router.get("/functionup/collegeDetails", internController.getInternsDetails)

module.exports = router