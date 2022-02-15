const validateFileds = require('../middlewares/validate-fields')
const validateJwt = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateFileUpload = require('../middlewares/validate-file-upload');

module.exports = {
    ...validateJwt,
    ...validateRoles,
    ...validateFileds,
    ...validateFileUpload
}