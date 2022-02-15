const { Router } = require('express')
const { check } = require('express-validator')
const { uploadFile, uploadImage, getImage, uploadImageCloudinary, getImageCloudinary } = require('../controllers/uploads')
const { allowedCollections } = require('../helpers')
const { validateFields, validateFileUpload } = require('../middlewares')

const router = Router()

router.post('/',[
    validateFileUpload,
    validateFields
],uploadFile)

router.put('/:collection/:id',[
    validateFileUpload,
    check('id','Id must be a Mongo Id').isMongoId(),
    check('collection').custom(c => allowedCollections(c,['users','products', 'categories'])),
    validateFields
], uploadImage)
//], uploadImage)


router.get('/:collection/:id',[
    check('id','Id must be a Mongo Id').isMongoId(),
    check('collection').custom(c => allowedCollections(c,['users','products', 'categories'])),
    validateFields
],getImage)



module.exports = router