
const express = require("express")
const router = express.Router();
const AuthorController =require("../Controller/AuthorController")
const BlogController =require("../Controller/BlogController")
const mid =require("../MiddleWare/middleWare")


router.post("/createAuthor", AuthorController.CreateAuthor )
router.post("/postBlogs", BlogController.postBlogs)
router.post("/logIn",AuthorController.logIn )
router.post("/logInValid",mid.authenticate,AuthorController.logIn )

router.get("/getBlogs", BlogController.getBlogs)
router.put("/blogs/:blogId",mid.authenticate,mid.autherization,BlogController.putBlogs)
router.delete("/blogs/:blogId",mid.authenticate,mid.autherization,BlogController.deleteUser)//by id
router.delete("/blogs",BlogController.isdeleted)//by query

// router.delete("/blogs")

module.exports = router;