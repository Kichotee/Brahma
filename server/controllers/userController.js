const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");

// authenticate a user
// public function
// api/users POST

const loginUser = asyncHandler(
	async (req, res) => {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			res.status(400)
			throw new Error("please fill all fields");
		}

		res.json({ message: "login user" });
	}
);
// register a user
// public function
// api/users POST

const registerUser = asyncHandler(
	async (req, res) => {
		res.json({ message: "register user" });
	}
);
// get  user
// public function
// api/users POST

const getUser = asyncHandler(async (req, res) => {
	res.json({ message: "display user" });
});
// registerb new user
// public function
// api/users POST

module.exports = {
	registerUser,
	loginUser,
	getUser,
};
