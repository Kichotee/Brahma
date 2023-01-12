const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
   name: {
        type:String,
       required:[true,'please enter name']
    },
   Email: {
        type:String,
       required:[true,'please enter Email']
    },
   password: {
        type:String,
       required:[true,'please enter name']
    },

},{
    timestamps:true
})
module.exports= mongoose.model('User',userSchema)