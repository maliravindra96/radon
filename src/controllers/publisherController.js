const publisherModel= require("../models/publisherModel")

const createPublisher= async function (req, res) {
    let author = req.body
    let authorCreated = await publisherModel.create(author)
    res.send({data: authorCreated})
}

const getPublisherData= async function (req, res) {
    let authors = await publisherModel.find()
    res.send({data: authors})
}

module.exports.createPublisher= createPublisher
module.exports.getPublisherData= getPublisherData