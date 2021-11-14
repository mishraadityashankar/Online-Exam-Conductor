const express = require("express");
const router = express.Router();
const Questions = require("../models/question_schema");
const checkauth = require("../utils/checkAuth.js");
// get all
router.get("/get", checkauth, (req, res) => {
  Questions.find({ createdBy: req.userData.id }, (err, totalQuestions) => {
    if (err) {
      console.log("error");
    } else {
      res.status(200).json({ message: "Success", result: totalQuestions });
    }
  });
});

//post route

router.post("/add", checkauth, (req, res) => {
  Questions.create(req.body, (err, newlyCreatedQuestion) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ message: "Added", result: newlyCreatedQuestion });
    }
  });
});

// get details
router.get("/details/:id", checkauth, (req, res) => {
  Questions.findById(req.params.id, (err, foundQuestion) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "Success", result: foundQuestion });
    }
  });
});

router.post("/update/:id", checkauth, (req, res) => {
  Questions.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "Updated" });
    }
  });
});
//delete route
router.delete("/delete/:id", checkauth, (req, res) => {
  Questions.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
    if (err) {
      console.log("err is " + err);
    } else {
      res.status(200).json({ message: "Deleted", result: deletedQuestion });
    }
  });
});
module.exports = router;
