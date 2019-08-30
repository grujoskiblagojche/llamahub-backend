const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  u: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Member", schema);