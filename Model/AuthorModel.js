const mongoose = require('mongoose');
const orderModel = require("../usercontroller/AuthorModel");

const AuthorSchema = new mongoose.Schema( {
   name:{
    type:String
   },
    title : {
      type:String,
    },
    gender:{
      type:true,
      enum:["Mr","Mrs","Miss"]
    },
    email : {
      type : string,
      unique:true
    },
    password : {
      type:String,
      unique:true
    },
   
  }, { timestamps: true });
  module.exports = mongoose.model("Author", AuthorSchema)
  module.exports = router;