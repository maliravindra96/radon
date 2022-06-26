// const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { autherization } = require("../MiddleWare/middleWare");
const AuthorModel = require("../Model/AuthorModel")
const VALIDATOR = require("../validator/validate")


const CreateAuthor = async function (req, res) {
    try {
        let data = req.body
        if (!data.firstName)  return res.status(400).send({ status: false, message: "firstName is required" });
           
        let firstName = data.firstName.trim()
        firstName = firstName.split(' ').filter(x => x).join(' ')
        data.firstName = firstName

        if (!data.lastName) return res.status(400).send({ status: false, message: "lastName is required" });
            
        let lastName = data.lastName.trim()
        lastName = lastName.split(' ').filter(x => x).join('')
        data.lastName = lastName

        if (!data.title)  return res.status(400).send({ status: false, message: "title is required" });

        if (!data.email) return res.status(400).send({ status: false, message: "email is required" });
            
        if (!data.password)  return res.status(400).send({ status: false, message: "password is required" });
       
    
        let email = req.body.email
        if (!VALIDATOR.isValidEmail(email))
            return res.status(400).send({ msg: `this mail is not valid ::${email}` }) //template literal

        let password = req.body.password
        if (!VALIDATOR.isValidPassword(password))
            return res.status(400).send({ msg: `Password should be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter` })

        const find = await AuthorModel.findOne({email:email}) 
        if(find) res.status(404).send({status:false, msg: "This email already exists"})
       
        const CreatedData = await AuthorModel.create(data)
        res.status(201).send({ msg: CreatedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const logIn = async function (req, res) {
    try{
    let userName = req.body.email;
    let password = req.body.password;

    let user = await AuthorModel.findOne({ email: userName, password: password });
    
    // if(!userName.password == 0) return res.status(404).send({status: false, msg: "Please enter details"})   // changed by fazan

    if (!user)
        return res.status(404).send({
            status: false,
            msg: "username or the password is not correct",
        });


    //after successfully creation of login jwt token will be created

    let token = jwt.sign(
        {
            userId: user._id.toString(),
            batch: "Radon",
            organisation: "FunctionUp",
        },
        "Blog-site"
    );
    res.setHeader("x-api-key", token);
    res.status(201).send({ msg: "successfully login", token: token });
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }



}




module.exports.logIn = logIn
module.exports.CreateAuthor = CreateAuthor

