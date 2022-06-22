const BlogModel = require("../Model/BlogModel")

const getBlogs = async function (req, res) {

  try {
    let authorId = req.params.authorId;
    let catagory = req.params.catagory;
    let tags = req.params.tag;
    let subcatagory = req.params.subcategory;


    let authorDetails = await BlogModel.find(`${authorId}||${catagory}||${tags}||${subcatagory}`);
    if (!authorDetails || authorDetails.isDeleted)
      return res.send({ status: false, msg: "No such user exists" });
    res.send({ status: true, data: authorDetails });
  }

  catch(err){
    res.status(500).send({ msg: err.message })
  }
      };

module.exports.getBlogs = getBlogs
