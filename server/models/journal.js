const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
	{
        user:{
            type:mongoose.Schema.Types.ObjectId ,
            required:true,
            ref:'User'
        },
		text: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);


module.exports = mongoose.model('Journal', journalSchema);
