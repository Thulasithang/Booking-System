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

router.post("/", async (req, res) => {
  try {
    await userRoleService.addNewUserRole(req.body, (err, newUserRole) => {
      if (!err) {
        res.status(201).json(newUserRole);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error adding new role not from here");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await userRoleService.deleteUserRole(req.params.id, (err, deletedRole) => {
      if (!err) {
        res.status(200).json(deletedRole);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error deleting role not from here");
  }
});

router.get("/permissions", async (req, res) => {
  try {
    await userRoleService.getAllPermissions((err, permissions) => {
      if (!err) {
        res.status(200).json(permissions);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error getting permissions not from here");
  }
});

router.post("/permissions", async (req, res) => {
  try {
    await userRoleService.addNewPermission(req.body, (err, newPermission) => {
      if (!err) {
        res.status(201).json(newPermission);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error adding new permission not from here");
  }
});

router.put("/permissions/:id", async (req, res) => {
  try {
    await userRoleService.updatePermission(req.params.id, req.body, (err, updatedPermission) => {
      if (!err) {
        res.status(200).json(updatedPermission);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error updating permission not from here");
  }
});

router.post("/role-permission", async (req, res) => {
  try {
    await userRoleService.addRolePermission(req.body, (err, newRolePermission) => {
      if (!err) {
        res.status(201).json(newRolePermission);
      } else {
        res.status(500).json({ message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json("Error adding new role permission not from here");
  }
});

module.exports = router;
