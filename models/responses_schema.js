const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responsesSchema = new Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  testName: {
    type: String,
    default: "N/A",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  scoresObtained: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  passingMarks: {
    type: Number,
    default: 0,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  recordedAnswers: {
    type: [String],
    required: true,
  },
  passed: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  finishTime: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Responses", responsesSchema);
