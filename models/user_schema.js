const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  rollNo: { type: String, default: "" },
  class: { type: String, default: "" },
  institute: { type: String, default: "" },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: Number, required: true },
  expertise: { type: String, default: "" },
  role: { type: String, default: "Student" },
});
module.exports = mongoose.model("User", userSchema);
