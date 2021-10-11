const Role = require('../models/role')
const User = require('../models/user')

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

module.exports ={
    isValidRole,
    isEmailExist,
    isUserExistById: userExistById
}