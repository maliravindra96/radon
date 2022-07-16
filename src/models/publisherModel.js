const mongoose = require('mongoose');

const publisherMethod = new mongoose.Schema( {
    
    name: String,
    headQuarter: String
    

}, { timestamps: true });

module.exports = mongoose.model('publisher', publisherMethod)