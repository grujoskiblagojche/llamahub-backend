const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  p: { type: Boolean, required: true },
  u: { type: String, required: true },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Member", schema);