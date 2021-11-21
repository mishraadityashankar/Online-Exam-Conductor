const express = require("express");
const router = express.Router();
const Tests = require("../models/test_schema");
const checkAuth = require("../utils/checkAuth");

// get all
router.get("/get", checkAuth, (req, res) => {
  const dateNow = new Date();
  Tests.find({ endTime: { $gte: dateNow } }, (err, totalTests) => {
    if (err) {
      console.log("error");
    } else {
      res.status(200).json({ message: "Success", result: totalTests });
    }
  });
});

router.get("/getByUser", checkAuth, (req, res) => {
  Tests.find({ createdBy: req.userData.id })
    .sort({ endTime: -1 })
    .exec((err, totalTests) => {
      if (err) {
        console.log("error");
      } else {
        const expiredTests = totalTests.filter(
          (ele) => new Date(ele.endTime) <= new Date()
        );
        const remainingTests = totalTests.filter(
          (ele) => new Date(ele.endTime) > new Date()
        );
        return res.status(200).json({
          message: "Success",
          result: { expiredTests, remainingTests },
        });
      }
    });
});
//post route

router.post("/add", checkAuth, (req, res) => {
  Tests.create(req.body, (err, newlyCreatedTest) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res
        .status(201)
        .json({ message: "Added", result: newlyCreatedTest });
    }
  });
});

// get details
router.get("/details/:id", checkAuth, (req, res) => {
  Tests.findById(req.params.id)
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
