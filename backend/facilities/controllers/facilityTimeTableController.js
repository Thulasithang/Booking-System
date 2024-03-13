const express = require("express");
const router = express.Router();

const facilityTimeTableService = require("../service/facilityTimeTableService");

router.post("/", (req, res) => {
    //gets a list of time slots,  fac_id, and date
  facilityTimeTableService.addDisabledTimeSlots(req.body, (err, disabledSlotsForFacility) => {
    if (!err) {
        if (disabledSlotsForFacility.status === 200) {
          res
            .status(200)
            .json({ status: 200, message: "Slots disabled successfully" });
          return;
        } else if (disabledSlotsForFacility.status === 409) {
          res
            .status(200)
            .json({ status: 409, message: "Slots already filled" });
        }
      } else {
        console.log(err);
        res.status(500).json("Error adding new Facility");
      }
    });
  });

module.exports = router;

