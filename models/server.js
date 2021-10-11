require('dotenv').config()
const cors = require('cors')
const express = require('express')

const {dbConnection} = require('../database/config')


class Server{

    constructor(){
        this.port = process.env.PORT
        this.app = express();
        this.userPath ='/api/users'
        
        this.connectDB()
        
        this.middlewares()

        this.routes()
    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.static('public'))

        //this.app.use(bodyParser.urlencoded({ extended: false }))
 
        this.app.use(express.json())
        //this.app.use(bodyParser.json())
 
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