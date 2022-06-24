
const express = require("express")
const router = express.Router();
const AuthorController =require("../Controller/AuthorController")
const BlogController =require("../Controller/BlogController")
const mid =require("../MiddleWare/middleWare")


router.post("/createAuthor", AuthorController.CreateAuthor )
router.post("/logIn",mid.authenticate,AuthorController.logIn )
router.post("/postBlogs", BlogController.postBlogs)
router.get("/getBlogs", BlogController.getBlogs)
router.put("/blogs/:blogId",mid.authenticate,mid.autherization, BlogController.putBlogs)
router.delete("/blogs/:blogId",BlogController.deleteUser)
router.delete("/blogs",BlogController.isdeleted)

// router.delete("/blogs")

module.exports = router;