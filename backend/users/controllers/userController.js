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
        if (registeredUser.status === 200) {
        res.status(200).json("User registered successfully");
        }
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json("Error registering user not from here" + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    await userService.loginUser(req.body, (err, user) => {
      if (!err) {
        if (user === 401){
          res.status(200).json({ status:401, message: "Incorrect Password" });
          return;
        }
        else if (user.status === 200) {
          res.status(200).json(user);
          console.log("correct user from controller: ", user);
          return;
        }
      } else {
        console.log(err);
        if (err === 404) {
          res.status(200).json({ status:404, message: "User Not Found" });
        } else {
          res.status(500).json({ message: err.message });
        }
      }
    });
  } catch (error) {
    res.status(500).json("Error logging in user not from here");
  }
});

module.exports = router;
