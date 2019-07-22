const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  season: Number,
  weeks: [
    {
      week: Number,
      challenges: [
        {
          challenge: String,
          points: Number,
          number: Number,
          completed: Boolean
        }
      ]
    }
  ]
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Challenge", schema);
