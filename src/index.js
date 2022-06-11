const express = require('express');
const bodyParser = require('body-parser');

const route =require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();
const date = require("date-and-time");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://maliravindra96:EVqz2rukT8CYHqW7@cluster0.mkpwdi5.mongodb.net/mongo_book_pop_ref", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use(function(req, res, next) {
    const value = date.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    console.log(value,',', req.ip,',', req.url)
    next();
  }
  );
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

