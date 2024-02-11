const express = require("express");
const router = express.Router();

const userRoleService = require("../service/userRoleService");

router.get("/", async (req, res) => {
  try {
    await userRoleService.getAllUserRoles((err, userRoles) => {
      if (!err) {
        res.status(200).json(userRoles);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error getting user roles not from here");
  }
});

module.exports = router;