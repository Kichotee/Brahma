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
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Goals",
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
    invites: {
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
      required: true,
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
