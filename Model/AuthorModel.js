const mongoose = require('mongoose');
// var validator = require("email-validator");

var validateEmail = function (email) {
     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return re.test(email)
 };

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
    enum: ["Mr", "Mrs", "Miss"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,2})+$/, 'Please fill a valid email address']
  },
  password: {                                 
    type: String,
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Author", AuthorSchema)

