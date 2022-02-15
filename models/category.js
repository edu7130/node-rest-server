const {Schema,model} = require('mongoose')

const CategorySchema = Schema({
    name:{
        type: String,
        required:[true,'Name is required'],
        unique:true
    },
    active:{
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

CategorySchema.methods.toJSON= function(){
    const { __v, active, ...category } = this.toObject()
    //category.uid = _id
    return category
}
CategorySchema.toObject

module.exports = model('Category',CategorySchema)