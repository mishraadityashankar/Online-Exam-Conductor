const express = require("express");
const router = express.Router();
const Responses = require("../models/responses_schema");
const checkAuth = require("../utils/checkAuth");
const Questions = require("../models/question_schema");

// get all
router.get("/getByUser", checkAuth, (req, res) => {
  Responses.find({ studentId: req.userData.id }, (err, totalResponses) => {
    if (err) {
      return res.status(404).json({ message: "Cannot get responses list" });
    } else {
      if (totalResponses.length < 1)
        return res.status(200).json({ message: "No Responses" });
      return res.status(200).json({
        message: "Success",
        result: totalResponses,
      });
    }
  });
});

//post route

router.post("/create", checkAuth, (req, res) => {
  console.log(req.body);
  Responses.find(
    { testId: req.body.testId, studentId: req.body.studentId },
    (err, foundStudentResponse) => {
      if (err) {
        console.log(err);
        return res
          .status(404)
          .json({ message: "Cannot get response by student" });
      } else {
        console.log(foundStudentResponse);
        if (foundStudentResponse.length) {
          return res
            .status(200)
            .json({ message: "Found", result: foundStudentResponse[0]._id });
        } else {
          Responses.create(req.body, (err, newlyCreatedResponse) => {
            if (err) {
              return res.status(404).json({ message: "Cannot be created" });
            } else {
              res
                .status(201)
                .json({ message: "Added", result: newlyCreatedResponse._id });
            }
          });
        }
      }
    }
  );
});

// get details
router.get("/details/:responsesId", checkAuth, (req, res) => {
  Responses.findById(req.params.responsesId)
    .populate("questions")
    .exec((err, detailedResponses) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "Failed to get details" });
      } else if (detailedResponses.studentId === req.userData.id) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        return res
          .status(200)
          .json({ message: "Success", result: detailedResponses });
      }
    });
});

router.post("/update", checkAuth, (req, res) => {
  Responses.findByIdAndUpdate(
    req.body.responsesId,
    { recordedAnswers: req.body.answers },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "Failed to update" });
      } else {
        return res.status(200).json({ message: "updated" });
      }
    }
  );
});

router.post("/saveResult", checkAuth, (req, res) => {
  // responsesId , answers, passingMarks from body
  Responses.findById(req.body.responsesId)
    .populate("questions")
    .exec((err, detailedResponses) => {
      if (err) {
        console.log(err);
      } else {
        console.log(detailedResponses);
        let scoresObtained = 0;
        let recordedAnswers = req.body.answers;
        detailedResponses.questions.map((singleQuestion, ind) => {
          if (singleQuestion.answer.toString() === recordedAnswers[ind]) {
            scoresObtained += singleQuestion.marks;
          }
          return;
        });
        let passed =
          scoresObtained >= detailedResponses.passingMarks ? true : false;

        Responses.findByIdAndUpdate(
          req.body.responsesId,
          {
            recordedAnswers,
            passed,
            scoresObtained,
          },
          (err) => {
            if (err) {
              console.log(err);
              return res
                .status(404)
                .json({ message: "Failed to generate score" });
            } else {
              return res.status(200).json({ message: "Scores generated" });
            }
          }
        );
      }
    });
});
//delete route
router.delete("/delete/:id", (req, res) => {
  Responses.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
    if (err) {
      console.log("err is " + err);
    } else {
      res.status(200).json({ message: "deleted", result: deletedQuestion });
    }
  });
});
module.exports = router;
