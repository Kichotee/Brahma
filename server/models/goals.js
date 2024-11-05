const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref:"Categories"
    },
    team:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Teams'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goals", goalSchema);
