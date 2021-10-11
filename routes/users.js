const {Router} = require('express');
const { check } = require('express-validator');

const {validateFields} = require('../middlewares/validate-fields')
const {isValidRole, isEmailExist, isUserExistById } = require('../helpers/db-validator')

const { userGet, userPost, userDelete, userPut } = require('../controllers/users');

const router = Router();

router.get('/',userGet)

router.put('/:id',[
    check('id','No es un Id válido').isMongoId(),
    check('id').custom(isUserExistById),
    check('role','Role invalido').custom(isValidRole),
    validateFields
],userPut)

//check('role','Email invalido').isIn(['ADMIN_ROLE','USER_ROLE']),
router.post('/',[
    check('name','El nombre es requerido').notEmpty(),
    check('email','Email invalido').isEmail(),
    check('email').custom(isEmailExist),
    check('password','La contraseña es requerida y superior a 6 caracteres').isLength({min:6}),
    check('role','Role invalido').custom(isValidRole),
    validateFields
],userPost)

router.delete('/:id',[
    check('id','No es un Id válido').isMongoId(),
    check('id').custom(isUserExistById),
    validateFields
],userDelete)

module.exports = router