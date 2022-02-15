const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Product, Category, User } = require("../models");

const availablecollections = [
    'products',
    'categories',
    'users',
    'roles',
]


const search = (req, res = response) => {
    const { collection, term } = req.params
    if( !availablecollections.includes( collection )){
        return res.status(500).json({
            msg:`The collections availables are: ${availablecollections}`
        })
    }

    switch(collection){
        case 'categories':
            searchCategories(term, res)
        break;
        case 'products':
            searchProduct(term, res)
        break;
        case 'users':
            searchUsers(term, res)
        break;
        default:
            res.status(500).json({
                msg:'Search not implemented yet'
            })
        break;
    }
    
}


const searchProduct = async (term, res = response) => {
    const isMongoId = isValidObjectId(term)
    if(isMongoId){
        const product = await Product.findById(term).populate('category','name').populate('user','name')
        return res.json({
            results: (product)? [product]:[]
        })
    }

    const regex = new RegExp(term, 'i')
    const products = await Product.find({
        $or:[
            {name: regex},
            {description: regex}
        ],
        $and:[{
            active: true
        }]
    }).populate('category','name').populate('user','name')
    res.json({
        results: (products)? products:[]
    })
}

const searchCategories = async (term, res = response) => {
    const isMongoId = isValidObjectId(term)
    if(isMongoId){
        const category = await Category.findById(term).populate('user','name')
        return res.json({
            results: (category)? [category]:[]
        })
    }

    const regex = new RegExp(term, 'i')
    const categories = await Category.find({name: term, active: true}).populate('user','name')
    res.json({
        results: (categories) ? categories:[]
    })
}

const searchUsers = async (term, res = response) => {
    const isMongoId = isValidObjectId(term)
    if(isMongoId){
        const user = await User.findById(term)
        return res.json({
            results: (user)? [user]:[]
        })
    }

    const regex = new RegExp(term, 'i')
    const users = await User.find({
        $or: [{name: regex},{email: regex}],
        $and:[{
            active: true
        }]
    })
    res.json({
        results: (users) ? users:[]
    })
}

module.exports = {
    search
}