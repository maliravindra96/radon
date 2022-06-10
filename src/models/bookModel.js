const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema( {
        name:String,
        author_id:String,
        price:Number,
        ratings:Number,
    } ,{timestamp :true});

    module.exports = mongoose.model('books', booksSchema) //users

   
    
  


