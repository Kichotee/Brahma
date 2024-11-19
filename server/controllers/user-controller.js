const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const sendMail = require("../services/mailService");
const crypto = require("crypto");
const Token = require("../models/token");
const { Frontend_dev } = require("../constants");

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_Token, {
    expiresIn: "30d",
  });
}
// authenticate a user
// public function
// api/users POST

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  // compare data passed
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      user: {
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
});
// register a user
// public function
// api/users POST

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ message: "please fill all fields" });
  }
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    res.status(400).json({ message: "user already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    await token
      .save()
      .then(() => {
        
        sendMail({
          from: '"Accountably" <timiprecious18@gmail.com>',
          to: user.email,
          subject: "Welcome to Accountably",
          text: `Dear ${user.name}, welcome to Accountably. Your account has been created successfully.\n \n
          click this link ${Frontend_dev}/verify-account/${token.token} `,
        });
      })
      .catch((error) => {
        
        return res.status(500).send({ message: error.message });
      });

    res.status(201).json({
      message:
        "Your account has been created, kindly check your email for verification details",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        verfied: user.verified,
        token: token.token,
      },
    });
  } else {
    res.status(400).res.json({
      message: "invalid user",
    });
  }
});
// get  user
// public function
// api/users POST

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
// generate token

const confirmMail = asyncHandler(async (req, res, next) => {
  const { Id: token } = req.params;
  console.log(token);
  if (!token) {
    res.status(422).json({
      message: "No verification token provided",
    });
  }
  const userToken = await Token.findOne({ token: token }).populate({
    path: "_userId",
    select: "name email verified", // Only select needed fields
  });
  console.log(userToken);

  if (!userToken) {
    res.status(422).json({
      message: "Invalid token passed",
    });
  }
  const user = userToken._userId;
  console.log("user", user);
  if (!user) {
    return res.status(404).json({
      message: "No user associated with this token",
    });
  }
  user.verified = true;
  await user.save();

  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      verified: user.verified,
      token: generateToken(user._id),
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  confirmMail,
};
