const express = require("express");
const router = express.Router();

const facilityRepository = require("../repository/facilityRepository");
//Need to check for errors

router.get("/", (req, res) => {
  facilityRepository.getAllFacilities((err, facilities) => {
    if (!err) {
      res.status(200).json(facilities);
    } else {
      console.log(err);
      res.status(500).json("Error fetching facilities");
    }
  });
});

router.get("/:id", (req, res) => {
  facilityRepository.getFacilityById(req.params.id, (err, facility) => {
    if (!err) {
      res.status(200).json(facility);
    } else {
      console.log(err);
      res.status(500).json("Error fetching facility");
    }
  });
});

router.post("/", async (req, res) => {
  facilityRepository.addNewFacility(
    req.body.type,
    req.body.available,
    req.body.price_per_hour,
    (err, newFacility) => {
      if (!err) {
        res
          .status(200)
          .json(`New Facility ${req.body.type} has been added Successfully!`);
      } else {
        console.log(err);
        res.status(500).json("Error adding new Facility");
      }
    }
  );
});

router.put("/:id", async (req, res) => {
  facilityRepository.updateFacility(
    req.params.id,
    req.body.type,
    req.body.available,
    req.body.price_per_hour,
    (err, updatedFacility) => {
      if (!err) {
        res
          .status(200)
          .json(
            `Facility ${req.body.type} with id = ${req.params.id} has been updated Successfully!`
          );
      } else {
        console.log(err);
        res.status(500).json("Error updating Facility");
      }
    }
  );
});

router.delete("/:id", async (req, res) => {
  facilityRepository.deleteFacility(req.params.id, (err, deletedFacility) => {
    if (!err) {
      res
        .status(200)
        .json(
          `Facility with id = ${req.params.id} has been deleted Successfully!`
        );
    } else {
      console.log(err);
      res.status(500).json("Error deleting Facility");
    }
  });
});

module.exports = router;
