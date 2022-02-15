const { response } = require("express")
const { Product } = require('../models')

const productPost = async (req, res = response) => {
    const { active, ...data} = req.body
    data.user = req.user._id

    try{
        let product = new Product(data);
        await product.save()
        product = await product.populate('user','name')
        res.status(201).json(product)
    }
    catch(err){
        res.status(400).json(err)
    }
}

const productsGet = async (req, res = response) => {
    let { limit = 5, page = 0 } = req.query
    limit = Number(limit)
    page  = Number(page)


    const condition = {active:true}
    const [ products, count ] = await Promise.all([
        Product.find(condition).limit(limit).skip(page),
        Product.count(condition)
    ])

    res.json({
        count,
        limit,
        page,
        products
    })


}

const productGet = async (req, res = response) => {
    const id = req.params.id
    const product = await Product.findById(id).populate('user',)
    
    res.json(product)
}

const productPut = async (req, res = response) => {
    const id = req.params.id
    const { active, ...data} = req.body

    const product = await Product.findByIdAndUpdate(id, data,{new: true})
    res.json(product)
}

const productDelete = async (req, res = response) => {
    const id = req.params.id

    const product = await Product.findByIdAndUpdate(id, {active: false},{new: true})
    res.json(product)
}


module.exports = {
    productPost,
    productsGet,
    productGet,
    productPut,
    productDelete,
}