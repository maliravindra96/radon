const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const {default:mongoose}=require ('mongoose');
const app = express();

const multer = require("multer");
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// for parsing multipart/form-data
app.use(upload.single("files"));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://Prashant10:Cv4uY0uU1ijKMVpu@cluster0.j9jd1jo.mongodb.net/group50Database-DB?retryWrites=true&w=majority",{
    useNewUrlParser :true
})

.then( () => console.log("MongoDb is Connected"))
.catch( err => console.log(err))

app.use('/',route);

app.listen(process.env.PORT || 3000 ,function(){
    console.log('Express app running on port' + (process.env.PORT || 3000 ))
});