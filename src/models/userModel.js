const mongoose = require('mongoose');
const models= require("../models/userModel")
const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        required: true
    },
    emailId: String,
    password: String,
    isDeleted:{
        type:Boolean,
        Default:false
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    age: Number,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
module.exports.models =models