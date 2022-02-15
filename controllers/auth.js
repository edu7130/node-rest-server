const { response } = require("express")
const bcryptjs = require('bcryptjs')
const User = require("../models/user")
const { generateJWT } = require("../helpers/generate-jwt")
const { googleVerify } = require("../helpers/google-verify")


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


const googleSignIn = async (req, res = response)=>{
    const { id_token } = req.body
    

    try {

        const { email, name, picture} = await googleVerify(id_token);
        
        let user = await User.findOne({email})

        if(!user){
            const data = {
                name,
                email,
                password:':P',
                img: picture,
                google: true,
            }

            user = new User(data);
            await user.save();
        }

        if(!user.active){
            res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador'
            })
        }

        const token = generateJWT(user.id)
        
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
    }
    
}

module.exports = {
    login,googleSignIn
}