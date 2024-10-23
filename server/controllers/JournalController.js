const asyncHandler = require("express-async-handler");
const Journal = require("../models/journal");
const User = require("../models//users");

// get goals
// route api/ getGoals
// private

const getJournals = asyncHandler(async (req, res) => {
  const journals = await Journal.find({ user: req.user.id });
  res.status(200).json({
    data: { journals: journals },
  });
});

const postJournals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add text field");
  }
  if (!req.body.title) {
    res.status(400);
    throw new Error("please add title field");
  }
  const journal = await Journal.create({
    text: req.body.text,
    title: req.body.title,
    category: req.body.category,
    user: req.user.id,
  });

  res.status(200).json(journal);
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
