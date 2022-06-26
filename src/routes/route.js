
const express = require("express")
const router = express.Router();
const AuthorController =require("../Controller/AuthorController")
const BlogController =require("../Controller/BlogController")
const mid =require("../MiddleWare/middleWare")


router.post("/createAuthor", AuthorController.CreateAuthor )
router.post("/postBlogs",mid.authenticate, BlogController.postBlogs)
router.post("/logIn",AuthorController.logIn )
router.post("/logInValid",mid.authenticate,AuthorController.logIn ) // for checking valid 

router.get("/getBlogs",mid.authenticate,BlogController.getBlogs)
router.put("/blogs/:blogId",mid.authenticate,mid.autherization,BlogController.putBlogs)
router.delete("/blogs/:blogId",mid.authenticate,mid.autherization,BlogController.deleteUser)//by id
router.delete("/blogs",mid.authenticate,mid.autherization,BlogController.isdeleted)//by query

// router.delete("/blogs")

module.exports = router;