const internModel = require("../Model/internModel");
const collegeModel = require("../Model/collegeModel");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const namReg = /^[a-zA-Z ]{2,100}$/;
const mailReg = /^([a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]{2,3}$)/;
const number = /^([+]\d{2})?\d{10}$/; // 10 digits regx


// <===================> POST /functionup/interns <========================>

const createIntern = async function (req, res) {
  try {
    let internData = req.body;
    if (!isValidRequestBody(internData))
      return res.status(400).send({ status: false, message: "Data is required to add a College" });

    const { name, email, mobile, collegeName } = internData;
    if (!isValid(name)) {
      return res.status(400).send({ status: false, message: "Name is required" });
    }
    if (!namReg.test(name)) {
      return res.status(400).send({ status: false, message: "Name must be characters" });
    }
    const checkName = await internModel.findOne({ email: email });
    if (checkName) {
      return res.status(400).send({ status: false, message: "this name already exist" });
    }
    if (!isValid(email)) {
      return res.status(400).send({ status: false, message: "Email is required" });
    }

    if (!mailReg.test(email)) {
      return res.status(400).send({ status: false, message: "Please enter a valid email id" });
    }
    const checkEmail = await internModel.findOne({
      email: email,
      isDeleted: false,
    });
    if (checkEmail) {
      return res.status(400).send({ status: false, message: "this email already exist" });
    }

    if (!isValid(mobile))
      return res.status(400).send({ status: false, message: "Mobile number is required" });

    if (!number.test(mobile)) {
      return res.status(400).send({ status: false, message: "Mobile number must be numeric" });
    }
    const checkMobile = await internModel.findOne({ mobile: mobile });
    if (checkMobile) {
      return res.status(400).send({ status: false, message: "this mobile already exist" });
    }

    const isCollegePresent = await collegeModel.findOne({ name: collegeName });
    if (!isCollegePresent) {
      return res.status(400).send({ status: false, message: "Not present" });
    }
    const collegeId = isCollegePresent._id;
    internData["collegeId"] = collegeId;
    
    let createIntern = await internModel.create(internData);

    return res.status(201).send({
      status: true,
      msg: "Intern created Successfully",
      data: createIntern,
    });

  } catch (err) {
    res.status(500).send({ status: false, msg: "Bad Request", erroe: err.message });
  }
};



// ===========>  GET /functionup/collegeDetails



const getInternsDetails = async function (req, res) {
  try {
    let collegeName = req.query.collegeName;

    if (!collegeName) {
      return res.status(404).send({ status: false, message: "Please enter the college name" });
    }

    const dataTobePresented = await collegeModel.findOne({ name: collegeName });

    if (!dataTobePresented) {
      return res.status(404).send({ status: false, message: "This college not found..." });
    }
    let collegeId = dataTobePresented._id;

    let intern = await internModel
      .find({ collegeId: collegeId })
      .select({ _id: 1, name: 1, email: 1, mobile: 1 });
    if (intern.length < 1) {
      return res.status(400).send({ status: false, message: "no intern apllied in this college" });
    }
    const { name, fullName, logoLink } = dataTobePresented;
    res.status(200).send({
      status: true,
      data: {
        name: name,
        fullName: fullName,
        logoLink: logoLink,
        intern: intern,
      },
    });
    
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};



module.exports.createIntern = createIntern;
module.exports.getInternsDetails = getInternsDetails;
