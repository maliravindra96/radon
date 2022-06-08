const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const bookSchema = new mongoose.Schema( {
   bookName : {
       type : String,
       require : true
   },
   Price :{
       indianprice : String,
       europeanPrice : String
   },
   year : {
       type : Number,
       default : 2021
   },
   tags : {
       type : String,
       require : true
   },
   
   authorName : String,
   totalPages : Number,
   stockAvailable : Boolean
},
{timestamp : true})

module.exports = mongoose.model('books', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
