const { count } = require("console")
const bookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")
const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}
const createBook= async function (req, res) {
    let data= req.body
    let req_author_id =data.author_id
    if (!req_author_id){
      return res.status(400).send({
        message: 'author id is require!'
     });
    }
    let author=await authorModel.find()({author_id:req_author_id})
     console.log(author)
    if (author !=null ){
      let savedData= await bookModel.create(data)
      res.send({msg: savedData})
    }else {
      return res.status(400).send({
        message: 'author id is not valid!'
     });

    }   
}
const getBooksbyChetanBhagat= async function (req, res){
    let data= await authorModel.find( {authorName : "chetan Bhagat" } ).select("author_id")
    let bookdata = await bookModel.find({author_id:data[0].author_id})
    res.send({msg:bookdata})
}
let authorOfBook = async(req,res)=>{
    let data = await BookModel.findOneAndUpdate({name:"two state"},{$set:{price:100}},{new:true})
    let authorData = await Authormodel.find({author_id:data.author}).select("author_name")
    let price = data.price
    res.send({msg:authorData,price})
}
module.exports.createBook= createBook
module.exports.createAuthor= createAuthor
module.exports.getBooksbyChetanBhagat= getBooksbyChetanBhagat
module.exports.authorOfBook= authorOfBook
