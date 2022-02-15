const { response, request } = require("express")
const { Category } = require("../models")


const categoryPost = async (req, res = response) => {
    const name = req.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} already exists`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    console.log(data);

    const category = new Category(data)
    await category.save()

    res.status(201).json(
        category
    )
}

const categoriesGet = async (req, res = response) => {
    const { page = 0, limit = 5 } = req.query
    const condition = {active: true}
    const [categories, count] = await Promise.all([
        Category.find(condition)
                .populate('user','name')
                .skip(page)
                .limit(limit),
        Category.count(condition)
    ])

    res.json({
        count,
        categories
    })
}

const categoryGet = async (req = request, res = response) => {
    const id = req.params.id
    const category = await Category.findById(id).populate('user','name')
    res.json(category)
}

const categoryPut = async (req, res = response) => {
    const { id } = req.params
    const {active, user, ...data} = req.body
    data.user = req.user._id
    data.name = data.name.toUpperCase()

    const category = await Category.findByIdAndUpdate(id, data,{new:true})
    
    res.json(category)
}


const categoryDelete = async (req, res = response) => {
    const { id } = req.params

    const condition = { active:false }
    const category = await Category.findOneAndUpdate(id, condition, { new: true })
    res.json(category)
}   

module.exports = {
    categoryPost, 
    categoriesGet,
    categoryGet,
    categoryPut,
    categoryDelete
}