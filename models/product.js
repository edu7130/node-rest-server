const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
    name:{
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category'
    },
    description:{
        type: String,
        required: true,
    },
    available:{
        type: Boolean,
        default: true,
    },
    img: {
        type: String
    }
})

module.exports = model('Product',ProductSchema);