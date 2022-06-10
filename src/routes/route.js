const express = require('express');
const router = express.Router();
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/createAuthor", BookController.createAuthor)
router.post("/createBook", BookController.createBook)
router.get("/getBooksbyChetanBhagat", BookController.getBooksbyChetanBhagat)
module.exports = router;