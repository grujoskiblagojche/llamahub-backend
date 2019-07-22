const Member = require("./models/Member");
const Winner = require("./models/Winner");
const Landing = require("./models/Landing");
const Challenge = require("./models/Challenge");

module.exports = {
  createMember,
  createWinner,
  getWinners,
  getLandings,
  getChallenges
};

async function createMember(public, username) {
  const user = await Member.findOne({ u: username });
  if (user) throw "This user already enrolled";

  const newMember = new Member({
    u: username,
    p: public
  });

  await newMember.save();
}

async function createWinner() {
  const count = await Member.count();
  const random = Math.floor(Math.random() * count);
  const winner = await Member.findOne().skip(random);

  const newWinner = new Winner({
    u: winner.u,
    p: winner.p
  });

  //Delete all members async
  Member.deleteMany({});

  await newWinner.save();
}

async function getWinners() {
  return await Winner.find({})
    .sort({ createdAt: "desc" })
    .limit(5);
}

async function getLandings() {
  return await Landing.find({});
}

async function getChallenges() {
  return await Challenge.find({});
}
