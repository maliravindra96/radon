const mongoose = require('mongoose');

const authorModel = new mongoose.Schema( {
    author_name : String,
    author_id:{  
        type : String,
        unique : true,
        required : true
    },
    author_name: String,
    age:Number,
    address:String 
} ,{timestamp :true});
    
module.exports = mongoose.model('Author', authorModel) //users



