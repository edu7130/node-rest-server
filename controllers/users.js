const { request, response } = require('express')

const userGet = (req = request, res = response)=>{
    const {nombre, apikey} = req.query
    res.json({
        msg:'GET API => Controller',
        nombre,
        apikey
    });
}

const userPost = (req = request, res = response)=>{
    res.json({
        msg:'POST API => Controller'
    });
}

const userPut =(req = request, res = response)=>{
    const {id} = req.params
    res.json({ 
        msg:'PUT API => Controller',
        id
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