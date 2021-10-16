const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const validateJwt= async (req= request, res = response, next)=>{
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:'Token not exist'
        })
    }

    try{
        const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid)
        
        if(!user){
            return res.status(401).json({
                msg: 'Invalid Token. User is not exist'
            })
        }

        if(!user.active){
            return res.status(401).json({
                msg: 'Invalid Token. User is not active'
            })
        }
        
        req.user = user
        next()
    }
    catch(error){
        console.log(error);
        res.status(401).json({
            msg:'Invalid token'
        })
    }

}

module.exports ={
    validateJwt
}
