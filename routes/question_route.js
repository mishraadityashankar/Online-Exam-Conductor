const express = require("express");
const router = express.Router();
const Questions = require("../models/question_schema");

// get all
router.get("/get", (req, res) => {
  Questions.find({}, (err, totalQuestions) => {
    if (err) {
      console.log("error");
    } else {
      res.status(200).json({ message: "Success", result: totalQuestions });
    }
  });
});

//post route

router.post("/add", (req, res) => {
  Questions.create(req.body, (err, newlyCreatedQuestion) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ message: "Added", result: newlyCreatedQuestion });
    }
  });
});

// get details
router.get("/details/:id", (req, res) => {
  Questions.findById(req.params.id, (err, foundQuestion) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "Success", result: foundQuestion });
    }
  });
});

router.post("/update/:id", (req, res) => {
  Questions.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "updated" });
    }
  });
});
//delete route
router.delete("/delete/:id", (req, res) => {
  Questions.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
    if (err) {
      console.log("err is " + err);
    } else {
      res.status(200).json({ message: "deleted", result: deletedQuestion });
    }
  });
});
module.exports = router;
