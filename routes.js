const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const mainService = require("./service");

//User Routes /api/
router.post("/members", enrollMember);
router.get("/winners", getWinners);
router.get("/landings", getLandings);
router.get("/ping", pingServer);

module.exports = router;

function enrollMember(req, res, next) {
  const { public, username } = req.body;
  if (!username)
    return res.status(400).json({ message: "You need to fill the username" });

  fetch("https://fortniteapi.io/lookup?username=" + username)
    .then(response => response.json())
    .then(data => {
      if (!data.result)
        return res.status(400).json({ message: "User does not exist" });

      mainService
        .createMember(username)
        .then(() => res.status(201).json({}))
        .catch(err => next(err));
    })
    .catch(error => next(error));
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

function pingServer(req, res, next) {
  return res.json({ message: "Server is running!" });
}
