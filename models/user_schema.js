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
  expertise: { type: String, default: "N/A" },
  role: { type: String, default: "Student" },
});
module.exports = mongoose.model("User", userSchema);
