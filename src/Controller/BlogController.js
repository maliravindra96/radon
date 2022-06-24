const BlogModel = require("../Model/BlogModel")
const AuthorModel = require("../Model/AuthorModel")
const { isValidObjectId,isValid } = require("../validator/validate")


const postBlogs = async function (req, res) {

  try {
    let create = req.body

//     if (!create.title) {
//       return res.status(400).send({ status: false, message: "Title is required" });
//  }
if(!isValid(create.title)){
  return res.status(400).send({ status: false, message: "Title is required" });
}


    if (!create.body) {
      return res.status(400).send({ status: false, message: "body is required" });
    }

    if (!create.author_id) {
      return res.status(400).send({ status: false, message: "authorId is required" });
    }
    //required tag
  //using regex (ismatch)


    if (!create.category) {
      return res.status(400).send({ status: false, message: "category is required" });
    }
    // required subcategory

    let authorid = req.body.author_id
    if (Object.keys(create).length == 0) {
      res.status(400).send({ status: false, msg: "please enter blog data" })
    }
    if (!isValidObjectId(authorid)) {
      return res.status(400).send({ status: false, msg: "author id is not valid" })
    }
    let find = await AuthorModel.findById(authorid)
    if (!find) {
      return res.status(404).send({ status: false, msg: "Author not found" })
    }
    let savedData = await BlogModel.create(create)
    res.status(201).send({ status: true, data: savedData })

  } catch (error) {
    res.status(500).send({ msg: error.message })
  }
}
const getBlogs = async function (req, res) {

  try {

    let data = req.query
    let filter = { $and: [{ isdeleted: false, isPublished: true, ...data }] }
    //console.log(filter)
    const findBlogs = await BlogModel.find(filter)
    if (!findBlogs) return res.status(404).send({ status: false, msg: "no such blogs found" })
    if (findBlogs.length == 0)
      return res.status(404).send({ status: false, msg: "no blogs found" })
    res.status(200).send({ status: true, data: findBlogs });

    //isDeleted true is coming err
    //24 digit mongoose
    //aauthor id valid




  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
};

const putBlogs = async function (req, res) {
  try {
    let data = req.body
    let id = req.params.blogId

    if (Object.keys(data).length == 0) {
      res.status(400).send({ status: false, msg: "please enter blog details for updating" })
    }

    if (!id) return res.status(400).send({ status: false, msg: "blogid is required" })

    let findBlog = await BlogModel.findById(id)
    console.log(findBlog)
    if (findBlog.isDeleted == true) res.status(404).send({ msg: "blog is deleted" })

    let updatedBlog = await BlogModel.findOneAndUpdate({ _id: id }, {
      $set: {
        title: data.title,
        body: data.body,
        category: data.category,
        publishedAt: new Date(),
        isPublished: true
      },
      $push: {
        tags: req.body.tags,
        subcategory: req.body.subcategory
      }
    }, { new: true, upsert: true })
    return res.status(200).send(updatedBlog)
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
};
const deleteUser = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await BlogModel.findOne({ _id: blogId, isDeleted: false })
    //console.log(blog)
    if (!blog) {
      return res.status(404).send({ status: false, msg: "no blogs found" })
    }
    await BlogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } })
    return res.status(200).send({ status: true, msg: "deleted successfully" })

  } catch (error) {
    //if(!blog)
    res.status(500).send({ msg: error.message })
  }
}

const isdeleted = async function (req, res) {
  try {
    let data = req.query
    let condition = { $and: [{ isdeleted: false, isPublished: true, ...data }] }
    const findBlogs = await BlogModel.findOneAndDelete({condition},{ $set: { isDeleted: true, deletedAt: new Date() } })
    console.log(findBlogs)
    if (findBlogs.length == 0)
      return res.status(404).send({ status: false, msg: "document doesn't exist" })
    res.status(200).send({ status: true, msg:"successfully deleted" });
  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
};


module.exports.postBlogs = postBlogs
module.exports.getBlogs = getBlogs
module.exports.putBlogs = putBlogs
module.exports.deleteUser = deleteUser
module.exports.isdeleted = isdeleted
