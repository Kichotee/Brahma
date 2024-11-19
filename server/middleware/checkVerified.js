const expressAsyncHandler = require("express-async-handler");
const User = require("../models/users");


const checkUserStatus=async (id)=>{
    const user= await User.findById(id)
    return user.verified;
    
}
module.exports = checkUserStatus