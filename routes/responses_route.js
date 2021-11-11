const express = require("express");
const router = express.Router();
const Responses = require("../models/responses_schema");

// get all
router.get("/get", (req, res) => {
  Responses.find({}, (err, totalResponses) => {
    if (err) {
      console.log("error");
    } else {
      res.status(200).json({ message: "Success", result: totalResponses });
    }
  });
});

//post route

router.post("/add", (req, res) => {
  Responses.create(req.body, (err, newlyCreatedQuestion) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ message: "Added", result: newlyCreatedQuestion });
    }
  });
});

// get details
router.get("/details/:id", (req, res) => {
  Responses.findById(req.params.id, (err, foundQuestion) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "Success", result: foundQuestion });
    }
  });
});

router.post("/update/:id", (req, res) => {
  Responses.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "updated" });
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
