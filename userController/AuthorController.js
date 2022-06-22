// const userModel = require("../models/userModel");
const AuthorModel = require("../Model/AuthorModel")
const VALIDATOR = require("../validator/validate")

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

}



module.exports.CreateAuthor = CreateAuthor