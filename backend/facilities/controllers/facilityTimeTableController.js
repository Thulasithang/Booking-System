const express = require("express");
const router = express.Router();

const facilityTimeTableService = require("../service/facilityTimeTableService");

//disable time slots for any facility required. 
// For admin use and facilities with max users as 1. (ex. tennis court, badminton, squash)
router.post("/disable", (req, res) => {
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

// get time slots that can be booked. Taken for each type of facility
// For users. Remove time slots that are disabled in exception_timetable.

// type_id, date are given as inputs
router.get("/available",( req, res) => {
  const type_id = req.query.type_id; 
  const date = req.query.date;
  console.log("type_id: ", type_id);
  console.log("date: ", date);
  facilityTimeTableService.getAvailableTimeSlots(type_id, date, (err, availableSlots) => {
    if (!err) {
      res.status(200).json(availableSlots);
    } else {
      console.log(err);
      res.status(500).json("Error fetching available time slots");
    }
  });
});



module.exports = router;

