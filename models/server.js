require('dotenv').config()
const cors = require('cors')
const express = require('express')

class Server{

    constructor(){
        this.port = process.env.PORT
        this.app = express();

        this.middlewares()

        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server on port', this.port)
        })
    }

}
module.exports = Server