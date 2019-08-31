const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  u: { type: String, required: true }
});
mongoose.Promise = global.Promise;
const Member = mongoose.model("Member", MemberSchema);
const MONGODB_URI =
  "mongodb+srv://igrujoskiblagojche:0LsfT9QhNwKeqAOF@llamahub-frbhv.gcp.mongodb.net:/llamahub?retryWrites=true&w=majority";

exports.enrollMember = (req, res) => {
  const { username } = req.body;
  if (!username)
    return res.status(400).json({ message: "You need to fill the username" });

  mongoose
    .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => {
      fetch("https://fortniteapi.io/lookup?username=" + username)
        .then(response => response.json())
        .then(data => {
          if (!data.result)
            return res
              .status(400)
              .json({ message: username + " does not exist" });

          createMember(username)
            .then(() => res.status(201).json({}))
            .catch(err => {
              if (typeof err == "string") {
                return res.status(400).json({ message: err });
              }
              if (err.name === "ValidationError") {
                return res.status(400).json({
                  errors: Object.keys(err.errors).reduce(function(errors, key) {
                    errors[key] = err.errors[key].message;

                    return errors;
                  }, {})
                });
              }
              return res.status(500).json({ message: err.message });
            });
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

async function createMember(username) {
  const user = await Member.findOne({ u: username });
  if (user) throw username + " already enrolled";

  const newMember = new Member({ u: username });

  await newMember.save();
}
