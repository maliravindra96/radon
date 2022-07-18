const UrlModel = require('../model/urlModel')
const shortId = require('shortid')
const Validation = require('../utility/validation')


const createShortUrl = async function (req, res) {
    try {
        // taking value from request body 
        let data = req.body;
        let { longUrl } = data
        
        // checking values entered in body or not 
        if (!Validation.emptyObject(data))
            return res.status(400).send({
                status: false,
                msg: 'Please enter the value '
            })

        // to check the entered values 
        if (!Validation.isEmpty(longUrl)) {
            return res.status(400).send({
                status: false,
                msg: 'please enter the correct value'
            })
        }
        
        // to check the valid url 
        if (!Validation.isValidUrl(longUrl))
            return res.status(400).send({
                status: false,
                msg: 'please enter valid url'
            })
       
            // to check the longUrl in our database 
        const checkUniqueUrl = await UrlModel.findOne({ longUrl: longUrl })
        if (checkUniqueUrl) {
            return res.status(400).send({
                status: false,
                message: "link is already shorted",
            })
        }

        // creating short url with urlcode
        const fixUrl = "http://localhost:3000/"
        const urlCode = shortId.generate()
        const shortUrl = fixUrl + urlCode

        let urlCreated = {
            longUrl,
            shortUrl,
            urlCode,
        }

        let savedData = await UrlModel.create(urlCreated)

        savedData = {
            longUrl,
            shortUrl,
            urlCode
        }

        return res.status(201).send({
            status: true,
            data: savedData
        });


    } catch (err) {
        res.status(500).send({
            msg: err.message
        })
    }



}

const redirectLongUrl = async function (req, res) {

    try {

        let urlCode = req.params.urlCode
      
        // to find codeurl in dataBase
        let checkUrlCode = await UrlModel.findOne({ urlCode: urlCode })
        if (!checkUrlCode) return res.status(400).send({
            status: false,
            msg: 'This urlCode is not exist'
        })
        let longUrl = checkUrlCode.longUrl
       
        // redirecting to long url
        return res.status(302).redirect(longUrl)
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

module.exports = { createShortUrl, redirectLongUrl }

  // if(!shortId.isValid(urlCode)){
        //     return res.status(400).send({
        //         status:false,
        //         msg:'Please enter valid shortid'
        //     })
        // }
        