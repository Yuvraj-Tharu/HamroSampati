const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/HamroSampati")
  .then(console.log("Connected to database"))
  .catch((err) => console.log(err));

module.exports = mongoose;
