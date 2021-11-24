const express = require("express");
const router = express.Router();
const Questions = require("../models/question_schema");
const checkauth = require("../utils/checkAuth.js");
// get all
router.get("/get", checkauth, (req, res) => {
  const subject = req.query.subject;
  let conditions = {
    createdBy: req.userData.id,
  };
  if (subject && subject !== "") {
    conditions = { ...conditions, subject };
  }
  Questions.find({ ...conditions }, (err, totalQuestions) => {
    if (err) {
      console.log("error");
      return res.status(404).send(err);
    } else {
      return res
        .status(200)
        .json({ message: "Success", result: totalQuestions });
    }
  });
});

//post route

router.post("/add", checkauth, (req, res) => {
  Questions.create(req.body, (err, newlyCreatedQuestion) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res
        .status(201)
        .json({ message: "Added", result: newlyCreatedQuestion });
    }
  });
});

// get details
router.get("/details/:id", checkauth, (req, res) => {
  Questions.findById(req.params.id, (err, foundQuestion) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res
        .status(200)
        .json({ message: "Success", result: foundQuestion });
    }
  });
});
//update route
router.post("/update/:id", checkauth, (req, res) => {
  Questions.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res.status(200).json({ message: "Updated" });
    }
  });
});
//delete route
router.delete("/delete/:id", checkauth, (req, res) => {
  Questions.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
    if (err) {
      console.log("err is " + err);
      return res.status(404).send(err);
    } else {
      return res
        .status(200)
        .json({ message: "Deleted", result: deletedQuestion });
    }
  });
});
module.exports = router;
