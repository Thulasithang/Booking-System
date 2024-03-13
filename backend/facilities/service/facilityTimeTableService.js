const express = require("express");
const moment = require("moment");

const facilityRepository = require("../repository/facilityRepository");
const facilityTimeTableRepository = require("../repository/facilityTimeTableRepository");

const addDisabledTimeSlots = async (exceptionData, callback) => {
  try {
    // check if fac exists
    // check if date is valid using moment js
    // check if slots are valid
    // check if slots are already disabled
    // add slots to db
    const facility = await facilityRepository.checkIfFacilityExists(
      exceptionData.fac_id
    );
    if (facility) {
      if (moment(exceptionData.exception_date).isValid()) {
        console.log(
          "Date validity: ",
          moment(exceptionData.exception_date).isValid()
        );
        formatted_slots = [];
        for (let i = 0; i < exceptionData.removed_slots.length; i++) {
          const slot = exceptionData.removed_slots[i];
          console.log("slot: ", slot);
          const valid_slot = moment(slot, "HH:mm:ss").isValid();
          if (!valid_slot) {
            callback(null, { status: 400, message: "Invalid slot" });
            return;
          }
          const slot_time = moment(slot, "HH:mm:ss");
          formatted_slots.push(slot_time.format("HH:mm:ss"));
        }
        const slotExists =  await facilityTimeTableRepository.checkIfSlotExists(
          exceptionData.fac_id,
          exceptionData.exception_date,
          formatted_slots,
        );
        if (slotExists) {
          callback(null, { status: 409, message: "Slot already exists" });
          return;
        }
        console.log("came here");
        console.log("formatted_slots: ", formatted_slots);
        await facilityTimeTableRepository.addDisabledSlots(
          exceptionData.fac_id,
          exceptionData.exception_date,
          formatted_slots,
          (err, disabledSlotsForFacility) => {
            if (!err) {
              callback(null, {
                status: 200,
                disabledSlotsForFacility,
              });
            } else {
              callback(null, {
                status: 500,
                message: "Error adding slots",
              });
            }
          }
        );
      } else {
        callback(null, { status: 400, message: "Invalid date" });
      }
    } else {
      callback(null, { status: 404, message: "Facility not found" });
    }
  } catch (error) {
    console.log("Error adding disabled time slots from catch: ", error);
    throw error;
  }
};

module.exports = {
  addDisabledTimeSlots,
};
