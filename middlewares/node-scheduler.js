const schedule = require("node-schedule-tz");
const mainService = require("../service");

module.exports = scheduleGiveaway;

function scheduleGiveaway() {
  schedule.scheduleJob(
    { hour: 13, minute: 30, dayOfWeek: 5, tz: "Europe/Belgrade" },
    function() {
      mainService
        .createWinner()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  );
}
