const express = require("express");
const router = express.Router();
const mainService = require("./service");

//User Routes /api/
router.post("/members", enrollMember);
router.get("/winners", getWinners);
router.get("/landings", getLandings);
router.get("/challenges", getChallenges);

module.exports = router;

function enrollMember(req, res, next) {
  const { public, username } = req.body;

  mainService
    .createMember(public, username)
    .then(() => res.status(201).json({}))
    .catch(err => next(err));
}

function getWinners(req, res, next) {
  mainService
    .getWinners()
    .then(winners => res.json(winners))
    .catch(err => next(err));
}

function getLandings(req, res, next) {
  mainService
    .getLandings()
    .then(landings => res.json(landings))
    .catch(err => next(err));
}

function getChallenges(req, res, next) {
  mainService
    .getChallenges()
    .then(challenges => res.json(challenges))
    .catch(err => next(err));
}
