const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
  try{
  let data = req.body;
  let savedData = await userModel.create(data);
  console.log(req.newAtribute);
  return res.status(200).send({ msg: "user is present",});
  }
  catch(error){
    return res.status(400).send({msg:"user not present",})
    
  }
};
const loginUser = async function (req, res) {
  let user;
  try{
    let userName = req.body.emailId;
  let password = req.body.password;
   user = await userModel.findOne({ emailId: userName, password: password });
   console.log(user)
   if (!user){
    throw new Error("Something unexpected has occurred.");
   }
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "thorium",
        organisation: "FunctionUp",
      },
      "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
  
  res.status(200).send({msg:"username and password is correct",})
  
  }
  catch (e){
    console.error(e);
       res.status(404).send({msg:"username or the password is not corerct",})
};
  // let token = jwt.sign(
  //   {
  //     userId: user._id.toString(),
  //     batch: "thorium",
  //     organisation: "FunctionUp",
  //   },
  //   "functionup-radon"
  // );
  // res.setHeader("x-auth-token", token);
  //res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  try{
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.status(200).send({ status: false, msg: "token must be present" });
  console.log(token);
  }catch(error){

  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.status(404).send({ status: false, msg: "token is invalid" });
  }
  let userId = req.params.userId;
  console.log(userId)
  let userDetails = await userModel.findOne({emailId: userId});
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
let token = req.headers["x-Auth-token"];
if (!token) token = req.headers["x-auth-token"];
if (!token) return res.send({ status: false, msg: "token must be present" });

console.log(token);

let decodedToken = jwt.verify(token, "functionup-radon");
if (!decodedToken)
  return res.send({ status: false, msg: "token is invalid" });

let userId = req.params.userId;
console.log(userId)
let userDetails = await userModel.findOne({emailId: userId});
if (!userDetails)
  return res.send({ status: false, msg: "No such user exists" });

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ emailId: userId }, userData);
  res.send({ status: updatedUser, data: userData });
};
const deleteUser = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });
  
  console.log(token);
  
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
  
  let userId = req.params.userId;
  console.log(userId)
  let userDetails = await userModel.findOne({emailId: userId});
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  
    let userData = req.body;
    userData.isDeleted=true;

    let updatedUser = await userModel.findOneAndUpdate({ emailId: userId }, userData);
    res.send({ status: updatedUser, data: userData });
  };
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser=deleteUser;
