
const express = require("express")
const router = express.Router();
const AuthorController =require("../Controller/AuthorController")
const BlogController =require("../Controller/BlogController")


router.post("/createAuthor", AuthorController.CreateAuthor )
router.post("/postBlogs", BlogController.postBlogs)
router.get("/getBlogs", BlogController.getBlogs)
router.put("/blogs/:blogId", BlogController.putBlogs)
router.delete("/blogs/:blogId",BlogController.deleteUser)
router.delete("/blogs",BlogController.isdeleted)

// router.delete("/blogs")

module.exports = router;