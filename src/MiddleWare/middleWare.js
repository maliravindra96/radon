const jwt = require("jsonwebtoken");
const BlogModel = require("../Model/BlogModel");
const { isValidObjectId } = require("../validator/validate")

const authenticate = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["X-Api-Key"]
    if (!token) return res.status(400).send({ status: false, msg: "token must be present in the request header" })
    let decodedToken = jwt.verify(token, 'Blog-site', function (err, decodedToken) {
      if (err) {
        res.status(401).send({ status: false, msg: "invalid token" })
      } else {
        return decodedToken
      }
    })

    req.decodedToken = decodedToken

    next()
  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

const autherization = async function (req, res, next) {
  try {
    let blogId = req.params.blogId

    const blogDetail = await BlogModel.findById(blogId)
    let userLoggedIn = req.decodedToken.userId
    // if (!isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "blog id is not valid" })
    // console.log(blogDetail.author_id)
    // console.log(blogDetail.author_id.toString())
    if (blogDetail.author_id.toString() !== userLoggedIn)
      return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    next()
  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

module.exports.authenticate = authenticate
module.exports.autherization = autherization