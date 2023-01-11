const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema= new Schema({
    title:{
        type:String,
        required:true,
        
    },
    body:{
        type:String,
        required:true,

    },
   
}, {timestamps:true})
const Journal = mongoose.model('Journal ', journalSchema)

module.export = Journal