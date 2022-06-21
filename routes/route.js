
const express = require("express")
const router = express.Router();
const AuthorController =require("../userController/AuthorController")

router.post("/createAuthor", AuthorController.CreateAuthor )
// router.post("/postBlogs", BlogController.postBlogs)

// router.get("/getBlogs", BlogController.getBlogs)
// router.put("/blogs/:blogId", BlogController)

// router.delete("/blogs/:blogId",BlogController)
// router.delete("/blogs")

module.exports = router;