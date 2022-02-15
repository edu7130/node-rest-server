const dbValidator = require('./db-validator')
const generateJwt = require('./generate-jwt')
const googleVerify = require('./google-verify')
const uploadFile = require('./upload-file')

module.exports = {
    ...dbValidator,
    ...generateJwt,
    ...googleVerify,
    ...uploadFile
}