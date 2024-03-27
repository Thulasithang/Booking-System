const express = require("express");
const router = express.Router();

const facilityRepository = require("../repository/facilityRepository");
const facilityService = require("../service/facilityService");
//Need to check for errors

router.get("/", (req, res) => {
  try {
    console.log("came here");
    //Admins require All facilities available, Users require facilities by type
    const type_id = req.query.type_id ? req.query.type_id : null; 
    console.log("type_id: ", type_id);
    facilityService.getAllFacilitiesForType(type_id, (err, facilities) => {
      if (!err) {
        res.status(200).json(facilities);
      } else {
        console.log(err);
        res.status(500).json("Error fetching facilities");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching facilities");
  }
});

router.get("/type", (req, res) => {
  try {
    const columns = req.query.fields ? req.query.fields : null;
    facilityService.getAllFacilityTypes(columns, (err, facilityTypes) => {
      if (!err) {
        res.status(200).json(facilityTypes);
      } else {
        console.log(err);
        res.status(500).json("Error fetching facility types");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching facility types");
  }
});

router.get("/:id(\\d+)", (req, res) => {
  facilityRepository.getFacilityById(req.params.id, (err, facility) => {
    if (!err) {
      res.status(200).json(facility);
    } else {
      console.log(err);
      res.status(500).json("Error fetching facility");
    }
  });
});

// router.post("/", async (req, res) => {
//   facilityRepository.addNewFacility(
//     req.body.fac_id, //Identity generated by default. Therefore can specify fac_id if needed
//     req.body.type,
//     req.body.available,
//     req.body.price_per_hour,
//     (err, newFacility) => {
//       if (!err) {
//         res
//           .status(200)
//           .json(`New Facility ${req.body.type} has been added Successfully!`);
//       } else {
//         console.log(err);
//         res.status(500).json("Error adding new Facility");
//       }
//     }
//   );
// });

router.post("/type/add", async (req, res) => {
  facilityService.addNewFacilityType(req.body, (err, newFacilityType) => {
    console.log("newFacilityType from controller: ", newFacilityType);
    if (!err) {
      if (newFacilityType.status === 200) {
        res
          .status(200)
          .json({ status: 200, message: "Facility Type added successfully" });
        return;
      } else if (newFacilityType.status === 409) {
        res
          .status(200)
          .json({ status: 409, message: "Facility Type already exists" });
      }
    } else {
      console.log(err);
      res.status(500).json("Error adding new Facility Type");
    }
  });
});

// Add a New Facility
router.post("/add", async (req, res) => {
  //TODO: Add array of images
  // console.log("req.body: ", req.body);
  facilityService.addNewFacility(req.body, (err, newFacility) => {
    if (!err) {
      if (newFacility.status === 200) {
        res
          .status(200)
          .json({ status: 200, message: "Facility added successfully" });
        return;
      } else if (newFacility.status === 409) {
        res
          .status(200)
          .json({ status: 409, message: "Facility already exists" });
      }
    } else {
      console.log(err);
      res.status(500).json("Error adding new Facility");
    }
  });
});

// router.put("/:id", async (req, res) => {
//   facilityRepository.updateFacility(
//     req.params.id,
//     req.body.type,
//     req.body.available,
//     req.body.price_per_hour,
//     (err, updatedFacility) => {
//       if (!err) {
//         res
//           .status(200)
//           .json(
//             `Facility ${req.body.type} with id = ${req.params.id} has been updated Successfully!`
//           );
//       } else {
//         console.log(err);
//         res.status(500).json("Error updating Facility");
//       }
//     }
//   );
// });

router.put("/:id", async (req, res) => {
  facilityService.updateFacility(
    req.params.id,
    req.body,
    (err, updatedFacility) => {
      if (!err) {
        if (updatedFacility.status === 200) {
          res
            .status(200)
            .json({ status: 200, message: "Facility updated successfully" });
          return;
        } else{
          res.status(500).json("Error updating Facility");
        }
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


router.post("/coach/add", async (req, res) => {
  console.log("req.body: ", req.body);
  facilityService.addNewCoach(req.body, (err, newCoach) => {
    if (!err) {
      if (newCoach.status === 200) {
        res
          .status(200)
          .json({ status: 200, message: newCoach.message });
        return;
      } else if (newCoach.status === 409) {
        res
          .status(200)
          .json({ status: 409, message: "Coach already exists" });
      }
    } else {
      console.log(err);
      res.status(500).json("Error adding new Coach");
    }
  });
});

router.get("/coaches", (req, res) => {
  try {
    facilityService.getAllCoaches((err, coaches) => {
      if (!err) {
        console.log("coaches: ", coaches);
        res.status(200).json(coaches);
      } else {
        console.log(err);
        res.status(500).json("Error fetching coaches");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching coaches");
  }
});

router.get("/coaches/:id(\\d+)", (req, res) => {
  facilityService.findCoachById(req.params.id, (err, coach) => {
    if (!err) {
      res.status(200).json(coach);
    } else {
      console.log(err);
      res.status(500).json("Error fetching coach");
    }
  });
});

module.exports = router;
