const jwt = require("jsonwebtoken");

const authenticate = async function (req, res, next) {
    try{
    let token = req.headers["x-api-key"] || req.headers["X-Api-Key"]
    if (!token) return res.send({ status: false, msg: "token must be present in the request header" })
    let decodedToken = jwt.verify(token, 'Blog-site')

    if (!decodedToken) return res.send({ status: false, msg: "token is not valid" })
    next()
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
      }
}

const autherization = async function (req, res, next) {
    try{
    let token = req.headers["x-api-key"] || req.headers["X-Api-Key"]
    if (!token) return res.send({ status: false, msg: "token must be present in the request header" })
    //userId for which the request is made. In this case message to be posted.
    let decodedToken = jwt.verify(token, 'Blog-site')
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) 
    return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    next()
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
      }
}

module.exports.authenticate = authenticate
module.exports.autherization = autherization