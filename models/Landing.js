const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String, required: true },
  place: { type: String, required: true },
  posX: { type: Number, required: true },
  posY: { type: Number, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Landing", schema);
