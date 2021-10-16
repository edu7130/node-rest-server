const { response } = require("express")
const bcryptjs = require('bcryptjs')
const User = require("../models/user")
const { generateJWT } = require("../helpers/generate-jwt")


const login = async(req, res = response)=>{
    const {email,password} = req.body
    try{
        //validar si existe en base de datos
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg:'incorrect email or password - email'
            })
        }
        
        //verificar si el state es activo
        if(!user.active){
            return res.status(400).json({
                msg:'incorrect email or password - active'
            })
        }
        
        
        //copmrobar contraseña
        const validPassword = bcryptjs.compareSync(password,user.password)

        if(!validPassword){
            return res.status(400).json({
                msg:'incorrect email or password - password'
            })
        }


        //generar JWT

        const token = await generateJWT(user.id)


        res.json({
            msg:'Todo está super',
            token
        })
    }
    catch(error){
     return res.status(500).json({
         msg:'hable con el administrador de sistema'
     })   
    }
}

module.exports = {
    login
}