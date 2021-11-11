const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responsesSchema = new Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  scoresObtained: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  recordedAnswers: {
    type: [String],
    required: true,
  },
  passed: { type: Boolean, required: false },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Responses", responsesSchema);
