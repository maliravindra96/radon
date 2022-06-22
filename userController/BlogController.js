const BlogModel = require("../Model/BlogModel")
const AuthorModel = require("../Model/AuthorModel")

const mongoose = require('mongoose');
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
};

const postBlogs = async function (req, res) {
    // Create a blog document from request body. Get authorId in request body only
     try {
        let create = req.body
        let authorid = req.body.author_id
        if(!isValidObjectId(authorid)){
            res.status(400).send({status: false, msg: "author id is not valid"})
        }
        let find = await AuthorModel.findById(authorid)
        if(!find){
            return res.status(404).send({ status: false, msg: "Author not found" })
        }
        let savedData = await BlogModel.create(create)
        res.status(201).send({ status: true, data: savedData })
        
     } catch (error) {
         res.status(500).send({ msg: error.message })
 }
}
// } try {
//         let authorId = req.body.author_id
//         let Id = await BlogModel.findById(authorId)
//         if (!Id)
//             return res.status(400).send({ status: false, msg: "Please Enter Valid Id" })
//         if(authorId == Id){
//             let data = req.body
//             let savedData = await BlogModel.create(data)
//             res.status(201).send({ status: true, data: savedData })
//         }
//     } catch (error) {
//         res.status(500).send({ msg: error.message })
//     }



// - Return HTTP status 201 on a succesful blog creation. Also return the blog document. 
// The response should be a JSON object like [this](#successful-response-structure) 
// - Create atleast 5 blogs for each author
// Return HTTP status 400 for an invalid request with a response body like[this](#error-response-structure)
// ### Successful Response structure
// ```yaml
// {
//   status: true,
//   data: {

//   }
// }
// ```
// ### Error Response structure
// ```yaml
// {
//   status: false,
//   msg: ""
// }
// ```
module.exports.postBlogs = postBlogs
