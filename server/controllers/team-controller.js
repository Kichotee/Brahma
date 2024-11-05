const teams= require("../models/teams")

const createTeam= async ({
    name,users,milestones,category,timeline, user
})=>{
    const data={
        teamName:name,
        users:[...users],
        milestones:milestones,
        category:category,
        creator:user,
        admins:[user],
        timeline:{startDate:timeline.startDate,endDate:timeline.endDate}
    }
  const team=  await teams.create(data)
  return team
}

module.exports={createTeam}