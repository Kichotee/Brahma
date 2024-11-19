const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const checkUserStatus = require("./checkVerified");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_Token);
      req.user = await User.findById(decoded.id).select("-password");
      const isVerified = await checkUserStatus(req.user._id);

      if(!isVerified){
        return res.status(403).json({ message: "User is not verified" });

      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("no token, users not authorized");
  }
});
module.exports = { protect };
