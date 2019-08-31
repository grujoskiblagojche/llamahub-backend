const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const WinnerSchema = new Schema(
  { u: { type: String, required: true } },
  { timestamps: true }
);
const MemberSchema = new Schema({
  u: { type: String, required: true }
});
const Winner = mongoose.model("Winner", WinnerSchema);
const Member = mongoose.model("Member", MemberSchema);
const MONGODB_URI =
  "mongodb+srv://igrujoskiblagojche:0LsfT9QhNwKeqAOF@llamahub-frbhv.gcp.mongodb.net:/llamahub?retryWrites=true&w=majority";

exports.chooseWinner = (req, res) => {
  if (req.body.auth !== "jyh#ss!23*dd&fcj%@ws") {
    return res.status(403).json({ message: "Forbiden" });
  }

  mongoose
    .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => {
      createWinner().catch(err =>
        res.status(500).json({ message: "Failed to choose winner" })
      );
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

async function createWinner() {
  const count = await Member.count();

  if (count === 0) throw "No enrolled users";

  const random = Math.floor(Math.random() * count);
  const winner = await Member.findOne().skip(random);
  const newWinner = new Winner({ u: winner.u });

  await Member.deleteMany({});

  await newWinner.save();
}
