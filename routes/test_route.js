const express = require("express");
const router = express.Router();
const Tests = require("../models/test_schema");
const checkAuth = require("../utils/checkAuth");

// get all
router.get("/get", (req, res) => {
  Tests.find({}, (err, totalTests) => {
    if (err) {
      console.log("error");
    } else {
      res.status(200).json({ message: "Success", result: totalTests });
    }
  });
});

//post route

router.post("/add", checkAuth, (req, res) => {
  Tests.create(req.body, (err, newlyCreatedTest) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ message: "Added", result: newlyCreatedTest });
    }
  });
});

// get details
router.get("/details/:id", (req, res) => {
  Tests.findById(req.params.id)
    .populate("studentEnrolled")
    .populate("questions")
    .exec((err, foundTest) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Success", result: foundTest });
      }
    });
});

router.post("/update/:id", (req, res) => {
  Tests.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "updated" });
    }
  });
});
//delete route
router.delete("/delete/:id", (req, res) => {
  Tests.findByIdAndRemove(req.params.id, (err, deletedTest) => {
    if (err) {
      console.log("err is " + err);
    } else {
      res.status(200).json({ message: "deleted", result: deletedTest });
    }
  });
});
module.exports = router;
