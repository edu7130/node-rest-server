const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_CNN)
        /*
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        }
        */
        //console.log(con);
        console.log('Database is connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos')
    }
}


module.exports = {
    dbConnection
}