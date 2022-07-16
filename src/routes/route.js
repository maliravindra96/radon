const express = require('express');
const router = express.Router();

const publisherController= require("../controllers/publisherController")
const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createPublisher", publisherController.createPublisher  )
router.get("/getPublishersData", publisherController.getPublisherData)

router.put("/updateBook", bookController.updateBook  )
router.put("/updateBook1", bookController.updateBook1  )


router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;