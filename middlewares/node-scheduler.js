const schedule = require("node-schedule-tz");
const mainService = require("../service");

module.exports = scheduleGiveaway;

function scheduleGiveaway() {
  schedule.scheduleJob(
    { hour: 12, dayOfWeek: 5, tz: "Africa/Abidjan" },
    function() {
      mainService.createWinner.catch(err => console.log(err));
    }
  );
}
