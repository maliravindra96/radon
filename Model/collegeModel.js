const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: "Name is required",
            trim: true,
            unique: true
        },
        fullName:{
            type: String,
            require: "Full Name is required",
            trim: true,
        },
        logoLink:{
            type: String,
            require:  "Url is required",

        },
        isDeleted:{
            type: Boolean,
            default: false
        }, 
        
    }, {timestamps: true}

)
const college = mongoose.model("College", collegeSchema)
module.exports = college // colleges