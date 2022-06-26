const BlogModel = require("../Model/BlogModel")
const AuthorModel = require("../Model/AuthorModel")
const { isValidObjectId, isValid } = require("../validator/validate")


const postBlogs = async function (req, res) {

  try {
    let create = req.body

    if (!isValid(create.title)) return res.status(400).send({ status: false, message: "Title is required" });

    let title = create.title.trim()
    title = title.split(' ').filter(x => x).join(' ')
    create.title = title

    if (!isValid(create.body)) return res.status(400).send({ status: false, message: "body is required" });

    let body = create.body.trim()
    body = body.split(' ').filter(x => x).join(' ')
    create.body = body

    if (!create.author_id) return res.status(400).send({ status: false, message: "authorId is required" });

    if (!create.tag) return res.status(400).send({ status: false, message: "tag is required" });

    if(create.tag){
      let tag = create.tag
      let newArr =[];
      for(let i = 0; i< tag.length;i++){
          newArr.push(tag[i].replace(/\s/g, ""))
      }
      create.tag = newArr;
      }

      if(create.subcategory){
        let tag = create.subcategory
        let newArr =[];
        for(let i = 0; i< tag.length;i++){
            newArr.push(tag[i].replace(/\s/g, ""))
        }
        create.subcategory = newArr;
        
        }

    if (!create.category) return res.status(400).send({ status: false, message: "category is required" });
    let category = create.category.trim()
    category = category.split(' ').filter(x => x).join('')
    create.category = category

    if (!create.subcategory) return res.status(400).send({ status: false, message: "category is required" });

    let authorid = req.body.author_id
    if (Object.keys(create).length == 0) return res.status(400).send({ status: false, msg: "please enter blog data" })

    if (!isValidObjectId(authorid)) return res.status(400).send({ status: false, msg: "author id is not valid" })

    let find = await AuthorModel.findById(authorid)
    if (!find) return res.status(404).send({ status: false, msg: "Author not found" })

    let savedData = await BlogModel.create(create)
    return res.status(201).send({ status: true, data: savedData })

  } catch (error) {
   return res.status(500).send({ msg: error.message })
  }
}
const getBlogs = async function (req, res) {

  try {
    let data = req.query
    let authorId = req.query.author_id

    let condition = { $and: [{ isDeleted: false, isPublished: true }] }

    if (Object.keys(data).length == 0) {
      let findBlogs = await BlogModel.find(condition)
      return res.status(200).send({ status: true, msg: findBlogs })
    }

    if (authorId && !isValidObjectId(authorId)) return res.status(400).send({ status: false, msg: "author id is not valid" })

    let filter = { $and: [{ isDeleted: false, isPublished: true, ...data }] }
    // console.log(filter)
    let findBlogs = await BlogModel.find(filter)

    if (!findBlogs) return res.status(404).send({ status: false, msg: "No blog found" })
    if (findBlogs.length == 0) return res.status(404).send({ status: false, msg: "please enter existing Blog" })

    return res.status(200).send({ status: true, msg: findBlogs })

  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
};

const putBlogs = async function (req, res) {
  try {
    let data = req.body
    let id = req.params.blogId

    if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "please enter blog details for updating" })


    if (!id) return res.status(400).send({ status: false, msg: "blogid is required" }) // check seriously

    let findBlog = await BlogModel.findById(id)

    if (findBlog.isDeleted == true) res.status(404).send({ msg: "blogs already deleted" })

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

    if (!blog) {
      return res.status(404).send({ status: false, msg: "No blogs found to delete" })
    }
    await BlogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } })
    return res.status(200).send({ status: true, msg: "deleted successfully" }) // here  status true and data comes

  } catch (error) {
  
    res.status(500).send({ msg: error.message })
  }
}

const isdeleted = async function (req, res) { 
  try {
    let data = req.query
    let condition = { $and: [{ isdeleted: false, isPublished: false, ...data }] }
    const findBlogs = await BlogModel.find(condition)
    if (!findBlogs) return res.status(404).send({ status: false, msg: "No document found" })

    if (Object.keys(data).length == 0) return res.status(404).send({ status: false, msg: "document doesn't exist" })
    
    const updated = await BlogModel.updateMany({condition},{$set: {isDeleted: true, deletedAt: new Date()}}, {new:true})
    res.status(200).send({status: true , msg: "successfully deleted"})
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

