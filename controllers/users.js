const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')


const userGet = async (req = request, res = response)=>{
    let {limit = 5, page = 0} = req.query
    const condition = { active: true }

    limit = Number(limit)
    page = Number(page)

    //const users = await User.find().limit(Number(limit)).skip(Number(from))

    const [ count, users ] = await Promise.all([
        User.count(condition),
        User.find(condition).limit(Number(limit)).skip(Number(page))
    ]);

    const userAuth = req.user
    res.json({
        userAuth,
        page,
        limit,
        count,
        users
    });
}

const userPost = async (req, res = response)=>{

    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password,salt)

    await user.save()
    res.json({
        user
    });
}

const userPut =async(req = request, res = response)=>{
    const {id} = req.params
    const {password, google, email,...userBody} = req.body
    
    if(password){
        const salt = bcryptjs.genSaltSync()
        userBody.password = bcryptjs.hashSync(password,salt)
    }
    const user = await User.findOneAndUpdate(id,userBody)

    res.json({
        user
    });
}

const userDelete = async (req = request, res = response)=>{

    const {id} = req.params

    const user = await User.findByIdAndUpdate(id, {active: false})

    const authuser = req.user
    res.json({
        user,
        authuser
    });
}



module.exports ={
    userGet,
    userPost,
    userPut,
    userDelete
}