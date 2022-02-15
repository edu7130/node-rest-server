const { Category, Product, Role, User } = require('../models')

const isValidRole=async (role='')=>{
    const roleExist = await Role.findOne({role})
    if(!roleExist){
        throw new Error('Role doesn\'t exist in the database')
    }
}

const isEmailExist=async (email = '')=>{
    const existeEmail = await User.findOne({email})
    if(existeEmail){
        throw new Error('Email already exist')
    }
}

const userExistById=async (id)=>{
    const userExist = await User.findById(id)
    if(!userExist){
        throw new Error(`Not user exist with this ID ${id}`)
    }
}

const categoryExist = async (id) => {
    const category = await Category.findOne({_id:id})
    if(!category){
        throw new Error(`Not category exist with this ID ${id}`)
    }
}

const productExistWithName = async (name) => {
    const product = await Product.findOne({name})
    if(product){
        throw new Error(`The product with name ${name} already exist`)
    }
}

const productExistWithID = async (id) => {
    const product = await Product.findById(id)
    if(!product){
        throw new Error(`The product with id ${id} not exist`)
    }
}

const allowedCollections = (collection = '', allowed = []) => {
    
    if(!allowed.includes(collection)){
        throw new Error(`The collection: ${colection} is not allowed`)
    }
    return true;
}


module.exports ={
    isValidRole,
    isEmailExist,
    isUserExistById: userExistById,
    categoryExist,
    productExistWithName,
    productExistWithID,
    allowedCollections
}