const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
  examName: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  totalMarks: { type: Number, required: true },
  passingMarks: { type: Number, required: true },
  activityThreshold: { type: Number, default: 3 },
});
module.exports = mongoose.model("Exam", examSchema);
