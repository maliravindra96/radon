const mongoose = require('mongoose');


const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
};
const isValidEmail = function(value){
    if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)){return true}
    else return false

}



module.exports = {isValidEmail,isValidObjectId}