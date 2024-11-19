const asyncHandler = require("express-async-handler");
const teams = require("../models/teams");

const createTeam = async ({
  name,
  users,
  milestones,
  category,
  timeline,
  admins,
  creator,
}) => {
  const data = {
    teamName: name,
    users: [...users],
    milestones: milestones,
    category: category,
    admins: [...admins],
    creator,
    timeline: { startDate: timeline.startDate, endDate: timeline.endDate },
  };
  console.log(data);

  const team = await teams.create(data);
  return team;
};

const removeUser = asyncHandler(async (req, res) => {
  const team = await teams.findById(req.params.teamId);
  console.log(team);

  if (!team) {
    res.status(404).json({ message: "Team does not exist" });
  }
  if (!team.admins.includes(req.user.id)) {
    res.status(401).json({ message: "Only an admin can add or remove user" });
  }
  if (team.users.length == 1) {
    res.status(401).json({ message: "Group must have at least one user" });
  }

  team.users.pull(req.params.userId);
  await team.save();
  return res.status(200).json(team);
});

const addUser = asyncHandler(async (req, res) => {
  const team = await teams.findById(req.params.teamId);
  if (!team) {
    res.status(404).json({ message: "Team does not exist" });
  }
  const userId = req.params.userId;
  if (!team.admins.includes(req.user.id)) {
    res.status(401).json({ message: "Only an admin can add or remove user" });
  }

  if (team.users.includes(userId)) {
    res.status(409);
    throw new Error("User already exits");
  }
  team.invites.push(userId);
  await team.save();
  return res.status(200).json(team);
});
const acceptInvite=asyncHandler(async (req, res) => {
  const team = await teams.findById(req.params.teamId);
  if (!team) {
    res.status(404).json({ message: "Team does not exist" });
  }
  const userId = req.user.id;
  

  if (team.users.includes(userId)) {
    res.status(409);
    throw new Error("User already exits");
  }
  team.users.push(userId);
  team.invites.pull(userId);
  await team.save();
  return res.status(200).json(team);
})

module.exports = { createTeam, removeUser, addUser, acceptInvite };
