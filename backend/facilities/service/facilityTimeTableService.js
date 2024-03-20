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
    // if date exists for that fac, update disabled slots array
    // else add new date and slots
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
        const slotExists = await facilityTimeTableRepository.checkIfSlotExists(
          exceptionData.fac_id,
          exceptionData.exception_date,
          formatted_slots
        );
        if (slotExists) {
          callback(null, { status: 409, message: "Slot already exists" });
          return;
        }
        // check if date exists for that fac
        // if yes, update disabled slots array
        const checkIfFacDateExists =
          await facilityTimeTableRepository.checkIfFacDateExists(
            exceptionData.fac_id,
            exceptionData.exception_date
          );
        if (checkIfFacDateExists) {
          await facilityTimeTableRepository.updateDisabledSlots(
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
          // if no existing records exist, add new date and slots
        } else {
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
        }
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

const getAvailableTimeSlots = async (type_id, date, callback) => {
  try {
    // for type_id get fac_id in that type
    // convert date to day. and get slots for that day
    // check if there are disabled time slots for that day
    // return available slots
    console.log("date: ", date);
    const facilitiesByType = await facilityRepository.getAllFacilitiesByTypeId(
      type_id
    );
    // console.log("facilitiesByType: ", facilitiesByType);
    const dayOfWeek = moment(date).format("dddd").toLowerCase();
    const availableSlots = [];
    const promises = facilitiesByType.map(async (facility) => {
      const general_slots = facility[dayOfWeek];
      if (general_slots === null) {
        return {
          fac_id: facility.fac_id,
          facility_name: facility.facility_name,
          slots: [],
        };
      } else {
        const disabledSlots = await facilityTimeTableRepository.getDisabledSlots(
          facility.fac_id,
          date
        );
        if (disabledSlots.length === 0) {
          return {
            fac_id: facility.fac_id,
            facility_name: facility.facility_name,
            slots: general_slots,
          };
        } else {
          return {
            fac_id: facility.fac_id,
            facility_name: facility.facility_name,
            slots: general_slots.filter((slot) => !disabledSlots.includes(slot)),
          };
        }
      }
    });
    
    Promise.all(promises)
      .then((availableSlots) => {
        console.log("availableSlots: ", availableSlots);
        callback(null, availableSlots);
      })
      .catch((error) => {
        console.error("Error processing available slots: ", error);
        callback(error, null);
      });
    
  } catch (error) {
    console.log("Error getting available time slots from catch: ", error);
    throw error;
  }
};

module.exports = {
  addDisabledTimeSlots,
  getAvailableTimeSlots,
};
