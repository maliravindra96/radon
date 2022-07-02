const mongoose = require("mongoose")

const internSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: "Name is required",
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: "email is required",
            trim:true,
            unique: true
    
        },
        mobile:{
            type: Number,
            unique: true,
            trim: true,
        },
        collegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: "ObjectId is required"
        },
        isDeleted:{
            type: Boolean,
            default: false
        }

    }, {timeStamp: true}
)

module.exports = mongoose.model("Intern", internSchema) // interns