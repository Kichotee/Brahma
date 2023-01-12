const asyncHandler = require("express-async-handler");
const Journal = require("../models/journal");

// get goals
// route api/ getGoals
// private

const getJournals = asyncHandler(
	async (req, res) => {
		const journals = await Journal.find();
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
        const updatedJournal= await Journal.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        })
		res.status(200).json(updatedJournal);
	}
);
const delJournals = asyncHandler(
	async (req, res) => {
        const journal = await Journal.findByIdAndRemove(req.params.id)

		res.status(200).json({
			message: `deleted ${journal}`,
		});
	}
);
module.exports = {
	getJournals,
	postJournals,
	updateJournals,
	delJournals,
};
