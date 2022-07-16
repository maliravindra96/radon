const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author;
    let publisherId = book.publisher

    let validObj = await authorModel.findById(authorId)
    console.log(validObj)

    let validObjPub = await publisherModel.findById(publisherId)

    if(!req.body.author) 
    return  res.send({msg:"author is requires"})
    
    else if(!validObj) 
    return res.send({msg: "please enter valid AuthorId"})
    
    else if(!req.body.publisher)
    return res.send({msg:"publisherId is requires"})
    
    else if(!validObjPub)
    return res.send({msg:"please enter valid publisherId"})
    
    else {
       let bookCreated = await bookModel.create(req.body)
       res.send({data: bookCreated})
   }
}
let updateBook =  async function (req, res) {
    let pubBody= req.body.publisher;
    let findPublisher =await publisherModel.find({name:pubBody})
    
    let specificBook = await bookModel.updateMany(
       {publisher:findPublisher},
        {$set:{isHardCover:true}},
        {new:true}
    )
    res.send({ data: specificBook })

}

let updateBook1 =  async function (req, res) {
   
    let findAuthor = await authorModel.find({rating:{$gt:3.5}})
    let specificBook = await bookModel.updateMany(
        {author:findAuthor},
        {$set:{$inc:{price:10}}},
        {new:true}
    ).count()
    res.send({ data: specificBook })

}




const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}






const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author publisher')
    res.send({data: specificBook})

}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails

module.exports.updateBook= updateBook
module.exports.updateBook1= updateBook1