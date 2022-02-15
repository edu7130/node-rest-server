const jwt = require('jsonwebtoken')


const generateJWT=(uid = '')=>{
    return new Promise((resolve, reject)=>{
        jwt.sign({uid},process.env.SECRETORPRIVATEKEY,{
            expiresIn:'2y'
        },(err,token)=>{
          if(err)  {
              reject('No se pudo generar el token')
          }
          else{
              resolve(token)
          }
        })
    })

}

module.exports ={
    generateJWT
}


