
const validUrl=require('valid-url')


const emptyObject = function (value) {
    return Object.keys(value).length > 0
}

const isEmpty = function (value) {
    if (typeof value === 'undefined' || value === 'null') return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number' && value.toString().trim().length === 0) return false
    return true;
}

const isValidUrl= function (value) {
    let checkUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.)?$/
    if (checkUrl.test(value)) {
        return true;
    }
    return false;
}


module.exports={
    emptyObject,
    isEmpty,
    isValidUrl
}