const express = require("express");
const router = express.Router();
const Users = require("../models/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../utils/checkAuth.js");

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, (hash_err, hash) => {
    if (hash_err) {
      return res.status(500).json({ error: hash_err });
    } else {
      const newUser = new Users({
        ...req.body,
        password: hash,
      });
      Users.create(newUser, (err, newlyCreatedUser) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err,
          });
        } else {
          return res.status(201).json({
            message: "Registeration successful",
            result: newlyCreatedUser,
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  Users.find({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        (auth_err, result) => {
          if (auth_err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          } else if (result) {
            const token = jwt.sign(
              {
                id: user[0]._id,
                email: user[0].email,
                role: user[0].role,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({ message: "success", token: token });
          } else {
            return res.status(401).json({
              message: "failed to fetch token",
              token: null,
            });
          }
        }
      );
    }
  });
});
// get all
router.get("/get", (req, res) => {
  Users.find({}, (err, totalUsers) => {
    if (err) {
      console.log("error");
      return res.status(404).send(err);
    } else {
      return res.status(200).json({ message: "Success", result: totalUsers });
    }
  });
});

//post route

router.post("/add", (req, res) => {
  Users.create(req.body, (err, newlyCreatedUser) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res
        .status(201)
        .json({ message: "Added", result: newlyCreatedUser });
    }
  });
});

// get details
router.get("/details/", checkAuth, (req, res) => {
  Users.find({ email: req.userData.email }, (err, foundUser) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res.status(200).json({ message: "Success", result: foundUser[0] });
    }
  });
});

router.post("/update/", checkAuth, (req, res) => {
  Users.findByIdAndUpdate(req.userData.id, req.body, (err, updatedUser) => {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    } else {
      return res.status(200).json({ message: "updated", result: updatedUser });
    }
  });
});
//delete route
router.delete("/delete/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      console.log("err is " + err);
      return res.status(404).send(err);
    } else {
      return res.status(200).json({ message: "deleted", result: deletedUser });
    }
  });
});

module.exports = router;
