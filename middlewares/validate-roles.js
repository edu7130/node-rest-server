const { response, request } = require("express")

const isAdminRole=(req = request, res = response, next)=>{
    if(!req.user){
        return res.status(500).json({
            msg:'Se está intentando verificar el rol sin verificar antes el token'
        })
    }

    const {role, name} = req.user

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} no es administrador`
        })
    }

    next()
}


const hasRole = (...roles)=>{
    return (req = request, res = response, next)=>{

        if(!req.user){
            return res.status(500).json({
                msg:'Se está intentando verificar el rol sin verificar antes el token'
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`${req.user.name} no posee el rol necesario`
            })
        }
        next()
    }
}


module.exports={
    isAdminRole,
    hasRole
}