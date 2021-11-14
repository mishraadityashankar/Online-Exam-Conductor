const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  testName: { type: String, required: true },
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
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  expired: { type: Boolean, default: true },
});
module.exports = mongoose.model("Test", testSchema);
