const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
   name: {
        type:String,
       required:[true,'please enter name']
    },
   email: {
        type:String,
       required:[true,'please enter Email']
    },
   password: {
        type:String,
       required:[true,'please enter name']
    },
    verified:{
      type:Boolean,
      default:false,
      required:true
    }

},{
    timestamps:true
})
module.exports= mongoose.model('User',userSchema)