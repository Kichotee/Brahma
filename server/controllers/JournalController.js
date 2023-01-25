const asyncHandler = require("express-async-handler");
const Journal = require("../models/journal");
const User = require("../models//users");

// get goals
// route api/ getGoals
// private

const getJournals = asyncHandler(
	async (req, res) => {
		const journals = await Journal.find({user: req.user.id});
		res.status(200).json({
			journals,
		});
	}
);
const postJournals = asyncHandler(
	async (req, res) => {
		if (!req.body.text) {
			res.status(400);
			throw new Error("please add text field");
		}
		const journal = await Journal.create({
			text: req.body.text,
			user :req.user.id
		});

		res.status(200).json(journal);
	}
);
const updateJournals = asyncHandler(
	async (req, res) => {
        const journal = await Journal.findById(req.params.id)
        if(!journal){
            res.status(400)
            throw new Error ('Journal not Found')
        }
		
		if(!req.user){
			res.status(401)
				throw new Error('user not found')
		}
		if(journal.user.toString()!==req.user.id){
			res.status(401)
			throw new Error('user not authorized') 

		}
        const updatedJournal= await Journal.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        })
		res.status(200).json(updatedJournal);
	}
);
const delJournals = asyncHandler(
	async (req, res) => {
        const journal = await Journal.findById(req.params.id)
	
		if(!req.user){
			res.status(401)
				throw new Error('user not found')
		}
		if(journal.user.toString()!== req.user.id){
			res.status(401)
			throw new Error('user not authorized') 

		}
        if(!journal){
            res.status(400)
            throw new Error ('Journal not Found')
        }
        journal.remove()
		res.status(200).json({
			message: ({id:req.params.id}),
		});
	}
);
module.exports = {
	getJournals,
	postJournals,
	updateJournals,
	delJournals,
};
