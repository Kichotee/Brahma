const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);


module.exports = mongoose.model('Journal', journalSchema);
