const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const WinnerSchema = new Schema(
  { u: { type: String, required: true } },
  { timestamps: true }
);
const Winner = mongoose.model("Winner", WinnerSchema);
const MONGODB_URI =
  "mongodb+srv://igrujoskiblagojche:0LsfT9QhNwKeqAOF@llamahub-frbhv.gcp.mongodb.net:/llamahub?retryWrites=true&w=majority";

exports.fetchWinners = (req, res) => {
  mongoose
    .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(async () => {
      const docs = await getWinners();
      return res.json(docs);
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

async function getWinners() {
  return await Winner.find({})
    .sort({ createdAt: "desc" })
    .limit(5);
}
