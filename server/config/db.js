const mongoose = require('mongoose')
const connectDB= async ()=>{
    try {
    const conn = await mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    
    console.log(`Mongo DB connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1 )
    }
}
module.exports= connectDB