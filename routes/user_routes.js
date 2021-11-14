const express = require("express");
const router = express.Router();
const Users = require("../models/user_schema");
const checkauth = require("../utils/checkAuth.js");
// const jwt= require('jsonwebtoken');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// router.get("/signup",(req,res)=>
// {
//   res.render('signup')
// })
router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, (hash_err, hash) => {
    if (hash_err) {
      res.status(500).json({ error: hash_err });
    } else {
      const newUser = new Users({
        ...req.body,
        password: hash,
      });
      Users.create(newUser, (err, newlyCreatedUser) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        } else {
          res.status(201).json({ message: "Added", result: newlyCreatedUser });
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
          }

          if (result) {
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

            return res.json({ message: "success", token: token });
          }

          return res.json({
            message: "failed",
            token: null,
          });
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
    } else {
      res.status(200).json({ message: "Success", result: totalUsers });
    }
  });
});

//post route

router.post("/add", (req, res) => {
  Users.create(req.body, (err, newlyCreatedUser) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ message: "Added", result: newlyCreatedUser });
    }
  });
});

// get details
router.get("/details/", checkauth, (req, res) => {
  console.log(req.userData);
  Users.find({ email: req.userData.email }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "Success", result: foundUser[0] });
    }
  });
});

router.post("/update/:id", (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: "updated" });
    }
  });
});
//delete route
router.delete("/delete/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      console.log("err is " + err);
    } else {
      res.status(200).json({ message: "deleted", result: deletedUser });
    }
  });
});

module.exports = router;
