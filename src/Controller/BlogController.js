const BlogModel = require("../Model/BlogModel")
const AuthorModel = require("../Model/AuthorModel")
const {isValidObjectId,isValidEmail}=require("../validator/validate")

const postBlogs = async function (req, res) {
  // Create a blog document from request body. Get authorId in request body only
  try {
    let create = req.body
    let authorid = req.body.author_id
    if (!isValidObjectId(authorid)) {
      return res.status(400).send({ status: false, msg: "author id is not valid" })
    }
    let find = await AuthorModel.findById(authorid)
    if (!find) {
      return res.status(404).send({ status: false, msg: "Author not found" })
    }
    let savedData = await BlogModel.create(create)
    res.status(201).send({ status: true, data: savedData,msg:"successfully created" })

  } catch (error) {
    res.status(500).send({ msg: error.message })
  }
}

const getBlogs = async function (req, res) {

  try {


    //let {author_id,tag,subcategory,category} = data

    // let authorId = req.query.author_id;
    // let category = req.query.category;
    // let tags = req.params.tag;
    // let subcatagory = req.params.subcategory;
    let data = req.query
    let filter = { $and: [{ isdeleted: false, isPublished: true, ...data }] }
    //console.log(filter)
    const findBlogs = await BlogModel.find(filter)
    if(!findBlogs)return res.status(404).send({ status: false, msg: "no such blogs found" })
    if (findBlogs.length == 0)
      return res.status(404).send({ status: false, msg: "no blogs found" })
    res.status(200).send({ status: true, data: findBlogs });


    //24 digit mongoose
    //aauthor id valid
    //

    //  if (!authorDetails || authorDetails.isDeleted)
    //     return res.send({ status: false, msg: "No such author exists" });
    //   else

  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
};

const putBlogs = async function (req, res) {
  
   try {
    let data = req.body
    let id = req.params.blogId
    //console.log(id)
    //require blog 
    if (!id) return res.status(400).send({ status: false, msg: "blogid is required" })

    //find 
    let findBlog = await BlogModel.findById(id)
    //console.log(findBlog)
    if (!findBlog.isDeleted == true) res.status(404).send({ msg: "blogid invalid" })
    if (findBlog.isDeleted == false) {

      let updatedBlog = await BlogModel.findOneAndUpdate({ _id: id }, {
        $set: {
        title: data.title,
        body: data.body,
        category: data.category,
        publishedAt: moment().format(),
        isPublished: true
      },
        $push: {
        tags: req.body.tags,
        subcategory: req.body.subcategory
      }
      }, { new: true, upsert: true })
    return res.status(200).send(updatedBlog)
  }}
  catch(err){
    res.status(500).send({msg:err.message})
  }
}

const deleteUser = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await BlogModel.findOne({ _id: blogId, isDeleted: false })
    console.log(blog)
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

const isdeleted=async function(req,res){
  try{
    let data =req.query
    let condition = {$and:[{isdeleted : false,isPublished:true,...data}]}
    const findBlogs = await BlogModel.findOneAndDelete(condition)
    console.log(findBlogs)
    if(findBlogs.length == 0)
    return res.status(404).send({status: false,msg:"document doesn't exist"})
    res.status(200).send({ status: true, data: findBlogs });
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
