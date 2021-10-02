require('dotenv').config()
const cors = require('cors')
const express = require('express')

class Server{

    constructor(){
        this.port = process.env.PORT
        this.app = express();
        this.userPath ='/api/users'
        this.middlewares()

        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.userPath, require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server on port', this.port)
        })
    }

}
module.exports = Server