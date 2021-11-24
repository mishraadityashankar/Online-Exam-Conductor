const express = require("express");
const router = express.Router();
const Exams = require("../models/exam_schema");
const checkAuth = require("../utils/checkAuth");

// get all
router.get("/get", checkAuth, (req, res) => {
  const dateNow = new Date();
  Exams.find({ endTime: { $gte: dateNow } }, (err, totalExams) => {
    if (err) {
      console.log("error");
      return res.status(404).send(err);
    } else {
      return res.status(200).json({ message: "Success", result: totalExams });
    }
  });
});

router.get("/getByUser", checkAuth, (req, res) => {
  Exams.find({ createdBy: req.userData.id })
    .sort({ endTime: -1 })
    .exec((err, totalExams) => {
      if (err) {
        console.log("error");
        return res.status(404).send(err);
      } else {
        const expiredExams = totalExams.filter(
          (ele) => new Date(ele.endTime) <= new Date()
        );
        const remainingExams = totalExams.filter(
          (ele) => new Date(ele.endTime) > new Date()
        );
        return res.status(200).json({
          message: "Success",
          result: { expiredExams, remainingExams },
        });
      }
    });
});
//post route

router.post("/add", checkAuth, (req, res) => {
  Exams.create(req.body, (err, newlyCreatedExam) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res
        .status(201)
        .json({ message: "Added", result: newlyCreatedExam });
    }
  });
});

// get details
router.get("/details/:id", checkAuth, (req, res) => {
  Exams.findById(req.params.id)
    .populate("questions")
    .exec((err, foundExam) => {
      if (err) {
        console.log(err);
        return res.status(404).send(err);
      } else {
        const filteredQuestion = foundExam.questions.map((ele) => {
          const newEle = {
            _id: ele._id,
            questionName: ele.questionName,
            problemStatement: ele.problemStatement,
            option_A: ele.option_A,
            option_B: ele.option_B,
            option_C: ele.option_C,
            option_D: ele.option_D,
            subject: ele.subject,
            createdBy: ele.createdBy,
            difficulty: ele.difficulty,
            marks: ele.marks,
          };
          return newEle;
        });
        return res.status(200).json({
          message: "Success",
          result: { ...foundExam.toJSON(), questions: filteredQuestion },
        });
      }
    });
});

router.get("/fullDetails/:examId/:createrId", checkAuth, (req, res) => {
  if (req.params.createrId !== req.userData.id) {
    return res.status(403).json({
      message: "Not authorized",
    });
  } else {
    Exams.findById(req.params.examId)
      .populate("questions")
      .exec((err, foundExam) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        } else {
          return res
            .status(200)
            .json({ message: "Success", result: foundExam });
        }
      });
  }
});

router.post("/update/:examId/:createrId", checkAuth, (req, res) => {
  if (req.params.createrId !== req.userData.id) {
    return res.status(403).json({
      message: "Not authorized",
    });
  } else {
    Exams.findByIdAndUpdate(req.params.examId, req.body, (err) => {
      if (err) {
        console.log(err);
        return res.status(404).send(err);
      } else {
        return res.status(200).json({ message: "updated" });
      }
    });
  }
});
//delete route
router.delete("/delete/:examId/:createrId", checkAuth, (req, res) => {
  if (req.params.createrId !== req.userData.id) {
    return res.status(403).json({
      message: "Not authorized",
    });
  } else {
    Exams.findByIdAndRemove(req.params.examId, (err, deletedExam) => {
      if (err) {
        return res.status(404).send(err);
      } else {
        return res
          .status(200)
          .json({ message: "deleted", result: deletedExam });
      }
    });
  }
});
module.exports = router;
