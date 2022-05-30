const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: String,
  task: String,
  description: String,
});
module.exports = mongoose.model("model", todoSchema);
