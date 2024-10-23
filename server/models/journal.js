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
		title:{
			type:String,
			required:true
		},
		category:{
			type:String,
			required:false
		}
	},
	{ timestamps: true }
);


module.exports = mongoose.model('Journal', journalSchema);
