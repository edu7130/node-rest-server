const validateFileds = require('../middlewares/validate-fields')
const validateJwt = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validateJwt,
    ...validateRoles,
    ...validateFileds
}