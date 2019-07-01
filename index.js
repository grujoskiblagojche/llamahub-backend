require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error-handler");
const mongoose = require("mongoose");
const scheduleGiveaway = require("./middlewares/node-scheduler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API Route
app.use("/api/", require("./routes"));

// Production error handler
app.use(errorHandler);

// Connect mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch(err => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

//Start server
const server = app.listen(
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000,
  function() {
    //Schedule giveaway every friday
    scheduleGiveaway();

    console.log(
      "Listening on port " +
        server.address().port +
        " on " +
        process.env.NODE_ENV
    );
  }
);
