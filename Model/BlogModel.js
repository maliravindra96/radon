const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "Author"
    },
    tag: [String],

    category: {
        type: String,
        required: true,
        enum: ["technology", "entertainment", "lifestyle", "food", "fashion"]
    },
    subcategory: {
        type: String,
        enum: ["webdevelopment", "mobiledevelopment", "AI", "ML"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    publishedAt: {
             timestamps: true
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


module.exports = mongoose.model("Blog", BlogSchema)
