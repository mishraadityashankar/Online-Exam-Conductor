const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionName: { type: String, required: true },
  problemStatement: { type: String, required: true },
  option_A: { type: String, required: true },
  option_B: { type: String, required: true },
  option_C: { type: String, required: true },
  option_D: { type: String, required: true },
  answer: { type: [Boolean], required: true },
  subject: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  difficulty: { type: String, default: "Easy" },
  marks: { type: Number, default: 1 },
  explanation: { type: String, required: false },
});
module.exports = mongoose.model("Question", questionSchema);
