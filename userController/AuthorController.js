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

}



module.exports.CreateAuthor = CreateAuthor