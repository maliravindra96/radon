let axios = require("axios")
// const express = require('express');
// const router = express.Router();

let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getByDistrictId = async function (req, res) {
    try {
        let id = req.query.districtId
        let date = req.query.date
        //console.log('Here is our date and id:${id}${date}')
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data });
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.massage })
    }
}

let getSortedCities = async function (req, res) {
    try {
        let cities = ["banguluru", "mumbai", "delhi", "kolkata", "chennai", "london", "moscow"]
        let citiObjArray = []
        for (i = 0; i < cities.length; i++) {
            let obj = { city: cities[i] }
            let res = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=5c11c1a858441cd2af936d3c95d1020c')
            console.log(res.data.main.temp)

            obj.temp = res.data.main.temp
            citiObjArray.push(obj)
        }
        let sorted = citiObjArray.sort(function (a, b) { return a.temp - b.temp })
        console.log(sorted)
        res.status(200).send({ status: true, data: sorted })
    }

    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "server error" })
    }
    //5c11c1a858441cd2af936d3c95d1020c
}
let mamehandler = async function (req, res) {
    try {
        let options = {
            method ="post",
            url ='https://api.imgflip.com/caption_image?template_id=181913649&text0=functionup&text1=yes&username=chewie12345&password=meme@123'
        }
        let result = await axios(options)
        res.send({ data: result.data })

    } catch {
        console(error)
        res.status(500).send({ status: false, msg: "server error" })
    }
}

module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getByDistrictId = getByDistrictId
module.exports.getSortedCities = getSortedCities
module.exports.mamehandler = mamehandler