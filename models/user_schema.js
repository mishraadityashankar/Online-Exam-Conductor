const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  rollNo: { type: String, default: "N/A" },
  class: { type: String, default: "N/A" },
  institute: { type: String, default: "N/A" },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: Number, required: true },
  bio: { type: String, required: false },
  cgpa: { type: Number, default: 0 },
  role: { type: String, default: "student" },
});
module.exports = mongoose.model("User", userSchema);
