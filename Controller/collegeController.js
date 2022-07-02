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

const createCollege = async function (req, res) {
  try {
    let collegeData = req.body;
    let { name, fullName, logoLink } = collegeData;
    if (!isValidRequestBody(collegeData))
      return res.status(400).send({ status: false, msg: "Data is required to add a College" });

    if (!isValid(name)) {
      return res.status(400).send({ status: false, msg: "Name is required" });
    }

    if (!namReg.test(name)) {
      return res.status(400).send({ status: false, msg: "Name must be characters" });
    }
    let checkName = await collegeModel.findOne({ name: name });
    if (checkName) {
      return res.status(400).send({ status: false, message: "Name already exist" });
    }
    if (!isValid(logoLink))
      return res.status(400).send({ status: false, msg: "Logo link is required" });

    if (!namReg.test(fullName)) {
      return res.status(400).send({ status: false, msg: "Full name must be characters" });
    }

    let createCollege = await collegeModel.create(collegeData);
    return res.status(201).send({
      status: true,
      msg: "College created Successfully",
      data: createCollege,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: "Bad Request", erroe: err.message });
  }
};

module.exports.createCollege = createCollege;
