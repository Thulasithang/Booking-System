const express = require("express");
const moment = require("moment");

const facilityRepository = require("../repository/facilityRepository");
const Facilities = require("../models/facilities");

function generateTimeSlots(openingTime, closingTime) {
  const slots = [];
  let timeSlot = moment(openingTime, "HH:mm:ss");
  // console.log(openTime);

  while (timeSlot.isBefore(moment(closingTime, "HH:mm:ss"))) {
    slots.push(timeSlot.format("HH:mm"));
    timeSlot.add(1, "hour");
  }
  return slots;
}

function addTimeSlotsToDays(newFacility, opening_times) {
  Object.entries(opening_times).forEach(([key, value]) => {
    // console.log(`${key}: ${value}`);
    newFacility[key.toLowerCase()] = generateTimeSlots(value.open, value.close);
  });
}

function addTimeSlotsForCoach(
  records,
  coach_id,
  fac_id,
  dateTimeObject, //{"start_date", "start_time", "close_time"}
  repeat,
  max_students
) {
  //convert date to day of week
  // get 4 X repeat months from date
  // for each week, for that day of week, add slots as [{time: time, max_students: max_students}]
  const dayOfWeek = moment(dateTimeObject.start_date).day();
  const dayString = moment(dateTimeObject.start_date).format("dddd");
  const startDate = moment(dateTimeObject.start_date);
  const endDate = moment(dateTimeObject.start_date).add(repeat, "months");
  let currentDate = startDate;
  const coachSlots = [];
  const day = currentDate.day();
  if (day === dayOfWeek) {
    generateTimeSlots(
      dateTimeObject.start_time,
      dateTimeObject.close_time
    ).forEach((time) => {
      coachSlots.push({ slot: time, remaining_players: max_students });
    });
    console.log("coachSlots: ", JSON.stringify(coachSlots));
    records.push({
      coach_id: coach_id,
      fac_id: fac_id,
      slot_remaining_players:coachSlots,
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate.format("YYYY-MM-DD"),
      day_of_week: dayString.toLowerCase(),
    });
  }

  currentDate.add(7, "day");
}
// newCoach.slots = coachSlots;

const addNewFacilityType = async (facilityType, callback) => {
  try {
    const lowerCaseName = facilityType.name.toLowerCase();
    const facilityTypeExists = await facilityRepository.findFacilityTypeByName(
      lowerCaseName
    );
    if (facilityTypeExists !== null) {
      callback(null, { status: 409, message: "Facility Type already exists" });
    } else {
      const newFacilityType = {
        type_name: lowerCaseName,
        small_description: facilityType.small_description,
        large_description: facilityType.large_description,
        //TODO Add images
      };
      await facilityRepository.addNewFacilityType(
        newFacilityType,
        (err, addedFacilityType) => {
          if (!err) {
            console.log("added new facility type from service");
            callback(null, { status: 200, facilityType: addedFacilityType });
          } else {
            console.log(err);
            callback(500, null);
          }
        }
      );
    }
  } catch (error) {
    console.log("Error adding new facility type from catch: ", error);
    throw error;
  }
};

const getAllFacilityTypes = async (columns, callback) => {
  try {
    const facilityTypes = await facilityRepository.getAllFacilityTypes(columns);
    callback(null, facilityTypes);
  } catch (error) {
    console.log("Error fetching facility types from catch: ", error);
    throw error;
  }
};

const addNewFacility = async (facility, callback) => {
  try {
    const newFacility = {
      facility_name: facility.name,
      type_id: parseInt(facility.type, 10),
      max_users: parseInt(facility.max_users, 10),
      price_per_hour: parseFloat(facility.price_per_hour).toFixed(2),
    };

    addTimeSlotsToDays(newFacility, facility.opening_times);
    console.log(newFacility);

    await facilityRepository.addNewFacility(
      newFacility,
      (err, addedFacility) => {
        if (!err) {
          console.log("added new facility from service");
          callback(null, { status: 200, facility: addedFacility });
        } else {
          console.log(err);
          callback(500, null);
        }
      }
    );
  } catch (err) {
    console.log("Error adding new facility from catch: ", err);
    throw err;
  }
};

const updateFacility = async (id, facility, callback) => {
  try {
    const updates = {
      facility_name: facility.facility_name,
      max_users: facility.max_users,
      price_per_hour: facility.price_per_hour,
    };
    console.log("updates: ", updates);
    await facilityRepository.updateFacility(
      id,
      updates,
      (err, updatedFacility) => {
        if (!err) {
          console.log("updated facility from service");
          callback(null, { status: 200, facility: updatedFacility });
        } else {
          console.log(err);
          callback(500, null);
        }
      }
    );
  } catch (err) {
    console.log("Error updating facility from catch: ", err);
    throw err;
  }
};

const getAllFacilitiesForType = async (type_id, callback) => {
  try {
    const facilities = await facilityRepository.getAllFacilitiesByTypeId(
      type_id
    );
    callback(null, facilities);
  } catch (error) {
    console.log("Error fetching facilities from catch: ", error);
    throw error;
  }
};

const addNewCoach = async (coach, callback) => {
  try {
    const records = [];
    const checkIfCoachExists = await facilityRepository.findCoachById(
      coach.coach_id
    );
    console.log("checkIfCoachExists: ", checkIfCoachExists);
    if (checkIfCoachExists === null) {
      console.log("came to null");
      const newCoach = {
        coach_id: coach.coach_id,
        type_id: parseInt(coach.type_id, 10),
        price_per_hour: parseFloat(coach.price_per_hour).toFixed(2),
      };
      await facilityRepository.addNewCoach(newCoach, (err, addedCoach) => {
        if (!err) {
          return;
        } else {
          console.log(err);
          callback(500, err);
        }
      });
    }
    for (let i = 0; i < coach.date_time.length; i++) {
      console.log("came to for loop")
      if (coach.repeat > 0) {
        addTimeSlotsForCoach(
          records,
          coach.coach_id,
          coach.fac_id,
          coach.date_time[i],
          coach.repeat,
          coach.max_students
        );
      }
    }
    console.log(records);
    // callback(null, { status: 200, message: records });
    await facilityRepository.addCoachTimeTable(records, (err, addedCoach) => {
      if (!err) {
        console.log("added new coach from service");
        callback(null, { status: 200, message: addedCoach });
      } else {
        console.log(err);
        callback(500, null);
      }
    });
  } catch (error) {
    console.log("Error adding new coach from catch: ", error);
    throw error;
  }
};

module.exports = {
  // addNewFacility,
  addNewFacilityType,
  getAllFacilityTypes,
  addNewFacility,
  getAllFacilitiesForType,
  updateFacility,
  addNewCoach,
};
