const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionName: { type: String, required: true },
  problemStatement: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: Number, required: true },
  difficulty: { type: String, default: "easy" },
  marks: { type: Number, default: 1 },
  explanation: { type: String, required: false },
});
module.exports = mongoose.model("Question", questionSchema);
