const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");

// authenticate a user
// public function
// api/users POST

const loginUser = asyncHandler(
	async (req, res) => {
		const { email, password } = req.body;
		// check if user exists
		const user = await User.findOne({ email });
		// compare data passed
		if (
			user &&
			(await bcrypt.compare(
				password,
				user.password
			))
		) {
			res.json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token:generateToken(user._id)
			});
		} else {
			res.status(400).res.json({
				message: "InVALID USER",
			});
		}
	}
);
// register a user
// public function
// api/users POST

const registerUser = asyncHandler(
	async (req, res) => {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			res.status(400);
			throw new Error("please fill all fields");
		}
		const userExists = await User.findOne({
			email,
		});
		if (userExists) {
			res.status(400);
			throw new Error("user already exists");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(
			password,
			salt
		);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		if (user) {
			res.status(201).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token:generateToken(user._id)
			});
		} else {
			res.status(400).res.json({
				message: "InVALID USER",
			});
		}
	}
	);
	// get  user
	// public function
	// api/users POST
	
	const getUser = asyncHandler(async (req, res) => {
		const {_id, email, name}= await User.findById(req.user.id);
		res.status(200).json({
			name,
			email
		})

	});
	// generate token
	const generateToken =(id)=>{
		return jwt.sign({id}, process.env.JWT_Token,{
			expiresIn:'30d'
		})
	}

module.exports = {
	registerUser,
	loginUser,
	getUser,
};
