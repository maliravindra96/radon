const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const models= require("../models/userModel")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/users/:userId", userController.getUserData)
router.put("/users/:userId", userController.updateUser)
router.delete("/users/:userId", userController.deleteUser)
module.exports = router;




