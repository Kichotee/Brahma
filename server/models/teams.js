const mongoose = require("mongoose");
const teamsSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },

    users: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "User",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    admins: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "User",
    },
    milestones: {
      type: [String],
      required: false,
    },
    category: {
      type: [mongoose.Schema.Types.ObjectId],
      reuired: true,
      ref: "Categories",
    },
    timeline: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teams", teamsSchema);

