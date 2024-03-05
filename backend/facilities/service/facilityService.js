const express = require("express");

const facilityRepository = require("../repository/facilityRepository");

// const addNewFacility = async (facility, callback) => {
//   try {
//     const facilityTypeExists = await facilityRepository.findFacilityTypeByNameOrCreateType(facility.type);
//     if (facilityTypeExists === null) {

//     }
//     }

//     const newFacilityType = {
//         name: facilityType.name,
//         small_description: facilityType.small_description,
//         large_description: facilityType.large_description,
//         //TODO Add images
//         };
//     console.log("newFacilityType: ", newFacilityType);
//     await facilityRepository.addNewFacilityType
//     callback(null, newFacilityType);
//   } catch (error) {
//     console.log("Error adding new facility type from catch: ", error);
//     throw error;
//   }
// };

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
            console.log("added new facility from service");
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

module.exports = {
  // addNewFacility,
  addNewFacilityType,
};
