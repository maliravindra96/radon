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
    author_id: {
        type: ObjectId,
        required: true,
        ref: "Author"
    },
    tag: [{type :String,}],

    category: {
        type: String,
        required: true,
    },
    subcategory: [String],

    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: String,
        default: null
    },
    publishedAt: {
        type: String,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


module.exports = mongoose.model("Blog", BlogSchema)
