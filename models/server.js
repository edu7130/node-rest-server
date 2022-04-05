require('dotenv').config()
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')
const {dbConnection} = require('../database/config')


class Server{

    constructor(){
        this.port = process.env.PORT || 80
        this.app = express();

        this.paths = {
            auth: '/api/auth',
            category: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
            user:'/api/users',
        }
        
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

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
 
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.category, require('../routes/categories'))
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
        this.app.use(this.paths.user, require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port,() => {
            console.log('Server on port', this.port)
        })
    }

}
module.exports = Server