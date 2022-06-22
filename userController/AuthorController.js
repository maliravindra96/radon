// const userModel = require("../models/userModel");
const AuthorModel=require("../Model/AuthorModel")

const CreateAuthor = async function(req,res){
    let data = req.body
    const CreatedData = await AuthorModel.create(data)
    res.status(201).send({msg:CreatedData})
}

module.exports.CreateAuthor = CreateAuthor