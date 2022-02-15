const {Router} = require('express');
const { check } = require('express-validator');

const { categoryPost, categoriesGet, categoryGet, categoryPut, categoryDelete } = require('../controllers/categories');
const { categoryExist } = require('../helpers/db-validator');

const { validateJwt, validateFields,hasRole, isAdminRole} = require('../middlewares');


const router = Router();

// public
router.get('/',categoriesGet)

// public
router.get('/:id',[
    check('id','Invalid id').isMongoId(),
    check('id').custom(categoryExist),
    validateFields
],categoryGet)

// admin
router.post('/',[
    validateJwt,
    check('name','Name is required').notEmpty(),
    validateFields
],categoryPost)

// admin
router.put('/:id',[
    check('id','Id is required').notEmpty(),
    check('id','Invalid Id').isMongoId(),
    check('name','Name is required').notEmpty(),
    check('id').custom(categoryExist),
    validateJwt,
    validateFields
],categoryPut)

// admin
router.delete('/:id',[
    validateJwt,
    check('id','Id is required').notEmpty(),
    check('id','Invalid Id').isMongoId(),
    check('id').custom(categoryExist),
    isAdminRole,
    validateFields
],categoryDelete)

module.exports = router