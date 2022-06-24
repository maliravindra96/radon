const mongoose = require('mongoose');


const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
};
const isValidEmail = function (value) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
    else return false

}

const isValid = function (value) {
     if(typeof(value)==="undefined"||typeof(value)==null) return false;

     if(typeof(value)==="string"&&value.trim().length==0) return false;


     //if (typeof(value)===' '&& value.match(/^\s+$/) !== null)return false;
     

    return true; 
   

    // function hasBlankSpaces(str){return  str.match(/^\s+$/) !== null;}
    // var addr = ' ';
    // if(hasBlankSpaces(addr)){
    //     console.log('The variable has blank spaces');}
}

module.exports = { isValidEmail, isValidObjectId, isValid }