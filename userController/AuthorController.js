// const userModel = require("../models/userModel");
const AuthorModel = require("../Model/AuthorModel")
const VALIDATOR = require("../validator/validate")

<<<<<<< HEAD
const CreateAuthor = async function(req,res){
    let data = req.body
    const CreatedData = await AuthorModel.create(data)
   try{ let data = req.body
    let email = req.body.email
    if(!VALIDATOR.isValidEmail(email))
    return res.status(400).send({msg:`this mail is not valid ::${email}`})
    const CreatedData= await AuthorModel.create(data)
    res.status(201).send({msg:CreatedData})
}catch(err){
    res.status(500).send({msg:err.message})
}
<<<<<<< HEAD
const deleteUser =async function(req,res){
    try{
    let blogId=req.params.blogId;
    let blog=await BlogModel.findById(blogId,isdeleted=false)
    console.log(blog)
    if(blog){
        let data=(saveData,isdeleted=true)
        return res.status(200).send({msg:data})
    }
    else{
        return res.status(404).send({msg:"error-response-structure"})
    }
    }catch(error){
        //if(!blog)
         res.status(500).send({msg:error.message})
    }
}
const isdeleted=async function(req,res){
    try{
        let category =req.query.params.category;
        let authorId=req.query.params.authorId;
        let tagName=req.query.params.tag;
        let subcategoryName=req.query.params.subcategory;
        let unpublished=req.query.params.unpublished;
=======
=======
const CreateAuthor = async function (req, res) {
    try {
        let data = req.body
        let email = req.body.email
        if (!VALIDATOR.isValidEmail(email))
            return res.status(400).send({ msg: `this mail is not valid::${email}` })
        const CreatedData = await AuthorModel.create(data)
        res.status(201).send({ msg: CreatedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
>>>>>>> 335ada66d0742f54eea752e116ca5aede126cb3c
>>>>>>> f1ffb53b7ea47d2ef339968dbffc84f4aab180bf

        let document=await BlogModel.findOneAndDelete(`${category}||${authorId}||${tagName}||${subcategoryName}||${unpublished}`);
        console.log(document)
        if(document){
            let data =(savedata,isdeleted=false)
            return res.status(200).send({msg:data})
        }
        else{
            return res.status(404).send({msg:"error-response-structure"})
        }
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}




module.exports.CreateAuthor = CreateAuthor
module.exports.deleteUser=deleteUser
