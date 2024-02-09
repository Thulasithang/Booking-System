const express = require("express");
const router = express.Router();

const userService = require("../service/userService");
/*
Cases tested:
- User already exists
- User registered successfully
- Incorrect table name 
*/
//register new user
router.post("/register", async (req, res) => {
  try {
    await userService.registerUser(req.body, (err, registeredUser) => {
      if (!err) {
        console.log("registeredUser: ", registeredUser);
        res.status(200).json(registeredUser);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error registering user not from here" + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    await userService.loginUser(req.body, (err, user) => {
      if (!err) {
        res.status(200).json('Welcome Back ' + user.user_name);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error logging in user not from here");
  }
});

module.exports = router;
