const express = require("express");
const router = express.Router();

const userService = require("../service/userService");
/*
Cases tested:
- User already exists
- User registered successfully
- Incorrect table name 
- 
*/
router.post("/register", async (req, res) => {
  try {
    await userService.registerUser(
      req.body,
      (err, registeredUser) => {
        if (!err) {
          console.log("registeredUser: ", registeredUser)
          res.status(200).json(registeredUser);
        } else {
          res.status(500).json({message: err.message});
        }
      }
    );
  } catch (error) {
    res.status(500).json("Error registering user not from here");
  }
});

router.get("/", (req, res) => {
  res.status(200).json("User service is working");
});

module.exports = router;
