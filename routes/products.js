const { Router } = require('express');
const { check } = require('express-validator');
const { productPost, productGet,productsGet, productPut, productDelete } = require('../controllers/products');
const { productExistWithName, productExistWithID } = require('../helpers/db-validator');
const { validateFields, validateJwt, isAdminRole } = require('../middlewares');


const router = Router();

//crear
router.post('/',[
    validateJwt,
    check('category','Category must be a Mongo Id').isMongoId(),
    validateFields,
    check('name','Name is required').notEmpty(),
    check('name').custom(productExistWithName),
    check('price','Price is required and must be number').notEmpty(),
    check('description','Description is required').notEmpty(),
    validateFields
],productPost)

//obtener todos
router.get('/',productsGet)

//obtener uno solo
router.get('/:id',[
    check('id','Id must be a Mongo Id').isMongoId(),
    validateFields,
    check('id').custom(productExistWithID),
    validateFields
],productGet)

//actualizar
router.put('/:id',[
    validateJwt,
    check('id','Id must be a Mongo Id').isMongoId(),
    validateFields,
    check('id').custom(productExistWithID),
],productPut)

//borrar
router.delete('/:id',[
    validateJwt,
    isAdminRole,
    check('id','Id must be a Mongo Id').isMongoId(),
    check('id').custom(productExistWithID),
    validateFields
],productDelete)


module.exports = router