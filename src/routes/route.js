const express = require('express');
const router = express.Router();
 const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//router.post("/createBook", UserController.createBook  )//getUsersData

//router.get("/creatBooks", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.post("/getBooksData", BookController.getBooksData)

router.post("/getBooksInYear", BookController.getBooksInYear  )

router.post("/getParticularBooks", BookController.getParticularBooks  )

router.post("/getXINRBooks", BookController.getXINRBooks )

router.post("/bookList", BookController.bookList)

router.post("/getRandonBooks", BookController.getRandonBooks  )

module.exports = router;