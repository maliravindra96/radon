const express = require('express');
const externalModule1= require('../logger/logger');
const externalModule2= require('../util/helper');
const externalModule3= require('../validator/formatter');


const router = express.Router();

router.get('/test-me', function (req, res) {
  externalModule1.welcome()
  externalModule2.printDate()
  externalModule2.printMonth()
  externalModule2.getBatchInfo()
  externalModule3.trimIt()
  externalModule3.changetoLowerCase()
  externalModule3.changetoUpperCase()

  
    res.send("this is my first solution")
});



module.exports= router;