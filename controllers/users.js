const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')


const userGet = async (req = request, res = response)=>{
    let {limit = 5, from = 0} = req.query
    const query = { state: true }

    limit = Number(limit)
    from = Number(from)


    //const users = await User.find().limit(Number(limit)).skip(Number(from))

    const [ count, users ] = await Promise.all([
        User.count(query),
        User.find(query).limit(Number(limit)).skip(Number(from))
    ]);


    res.json({
        from,
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

const userDelete =(req = request, res = response)=>{
    res.json({
        msg:'DELETE API => Controller'
    });
}



module.exports ={
    userGet,
    userPost,
    userPut,
    userDelete
}