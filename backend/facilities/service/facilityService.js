const express = require("express");
const moment = require("moment");

const facilityRepository = require("../repository/facilityRepository");
const Facilities = require("../models/facilities");

function generateTimeSlots(openingTime, closingTime) {
  const slots = [];
  let timeSlot = moment(openingTime, 'HH:mm:ss');
  // console.log(openTime);

  while (timeSlot.isBefore(moment(closingTime, 'HH:mm:ss'))){
    slots.push(timeSlot.format('HH:mm'));
    timeSlot.add(1, 'hour');
  }
  return slots;
};

function addTimeSlotsToDays(newFacility, opening_times){
  Object.entries(opening_times).forEach(([key, value]) => {
    // console.log(`${key}: ${value}`);
    newFacility[key.toLowerCase()] = generateTimeSlots(value.open, value.close); 
});
};

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

const getAllFacilityTypes = async( columns, callback) => {
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
    }

    addTimeSlotsToDays(newFacility, facility.opening_times);
    console.log(newFacility);

    await facilityRepository.addNewFacility(newFacility, (err, addedFacility) => {
      if (!err) {
        console.log("added new facility from service");
        callback(null, { status: 200, facility: addedFacility });
      } else {
        console.log(err);
        callback(500, null);
      }
    })
  } catch(err) {
    console.log("Error adding new facility from catch: ",err);
    throw err;
  }
}

const getAllFacilitiesForType = async (type_id, callback) => {
  try {
    const facilities = await facilityRepository.getAllFacilitiesByTypeId(type_id);
    callback(null, facilities);
  } catch(error) {
    console.log("Error fetching facilities from catch: ", error);
    throw error;
  }
}

module.exports = {
  // addNewFacility,
  addNewFacilityType,
  getAllFacilityTypes,
  addNewFacility,
  getAllFacilitiesForType
};
