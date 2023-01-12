
const express = require('express')
const app = express()
const dotenv= require('dotenv').config()
const mongoose = require('mongoose')
const {errorHandler}=require('./middleware/errorMiddleware')
const { urlencoded } = require('body-parser')
const connectDB= require('./config/db')
const port = process.env.PORT 

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


  
//     ;
// }).catch(err =>  {
//     console.log(err);
// })

app.use('/api/goals', require('./routes/journalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

    app.listen(port,()=>{
        console.log(`server on ${port} listening`);
    })