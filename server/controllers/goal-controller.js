const asyncHandler = require("express-async-handler");
const Journal = require("../models/goals");
const Teams = require("../models/teams");
const User = require("../models/users");
const { createTeam } = require("../controllers/team-controller");
const { default: mongoose } = require("mongoose");

// get goals
// route api/ getGoals
// private

const getJournals = asyncHandler(async (req, res) => {
  const journals = await Journal.find({ user: req.user.id }).populate("team");
  const addedJournals = await Journal.find({
    team: {
      $in: await Teams.find({ users: req.user.id }).distinct("_id"),
    },
  }).populate("team");
  console.log(addedJournals);
  res.status(200).json({
    data: { goals: [...journals, ...addedJournals] },
  });
});

const postJournals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please add text field" });
    throw new Error("please add text field");
  }
  if (!req.body.title) {
    res.status(400).json({ message: "Please add title field" });
    throw new Error("please add title field");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Create both documents in one transaction
    // const team = await Teams.create([{
    //   teamName: req.body.title,
    //   users: [req.user.id],
    //   category: req.body.category,
    //   milestones: req.body.milestones,
    //   timeline: {
    //     startDate: req.body.startDate,
    //     endDate: req.body.endDate,
    //   },
    //   creator: req.user.id,
    //   admins: [req.user.id],
    // }], { session });

    const team = await Teams.create([
      {
        teamName: req.body.title,
        users: [req.user.id],
        category: req.body.category,
        milestones: req.body.milestones,
        
        timeline: {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
        creator: req.user.id,
        admins: [req.user.id],
      },
    ],{session});

    const journal = await Journal.create(
      [
        {
          text: req.body.text,
          title: req.body.title,
          category: req.body.category,
          user: req.user.id,
          team: team[0]._id,
        },
      ],
      { session }
    );

    // Update team with journal reference
    await Teams.findByIdAndUpdate(
      team[0]._id,
      { goal: journal[0]._id },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();

    res.status(200).json(journal[0]);
  } catch (error) {
    // If anything fails, roll back the transaction
    await session.abortTransaction();
    throw error;
  } finally {
    // End the session
    session.endSession();
  }
});

const updateJournals = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (!journal) {
    res.status(400);
    throw new Error("Journal not Found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (journal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const updatedJournal = await Journal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedJournal);
});
const delJournals = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  console.log(journal);
  if (journal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  if (!journal) {
    res.status(400);
    throw new Error("Journal not Found");
  }
  await Journal.deleteOne({ _id: req.params.id });
  //   await journal.remove();
  res.status(200).json({
    data: { id: req.params.id },
    message: "Deleted Succesfully",
  });
});
module.exports = {
  getJournals,
  postJournals,
  updateJournals,
  delJournals,
};
