const { where } = require("sequelize");
const Facility = require("../models/facilities");
const FacilityType = require("../models/facilityType");
const sequelize = require("../dbConfig");
const Coaches = require("../models/coaches");
const CoachAvailableTimeTable = require("../models/coachAvailableTimeTable");

const getAllFacilities = async () => {
  try {
    const facilitiesList = await Facility.findAll();
    return facilitiesList;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllFacilitiesByTypeId = async (type_id) => {
  try {
    if (type_id) {
      const facilitiesList = await Facility.findAll({
        where: {
          type_id: type_id,
        },
      });
      return facilitiesList;
    } else {
      const facilitiesList = await Facility.findAll();
      return facilitiesList;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findFacilityTypeByName = async (name) => {
  try {
    const result = await FacilityType.findOne({
      where: {
        type_name: name,
      },
    });
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting facility type by name: ", error);
    throw error;
  }
};

const addNewFacilityType = async (facilityType, callback) => {
  try {
    const newFacilityType = await FacilityType.create({
      type_name: facilityType.type_name,
      small_description: facilityType.small_description,
      large_description: facilityType.large_description,
    });
    // console.log("facilityType: ", facilityType);
    callback(null, newFacilityType);
  } catch (error) {
    console.log("Error adding new facility type: ", error);
    throw error;
  }
};

const getAllFacilityTypes = async (columns) => {
  try {
    console.log("columns: ", columns ? columns : undefined);
    const facilityTypes = await FacilityType.findAll({
      attributes: columns ? columns : undefined,
    });
    console.log("facilityTypes: ", facilityTypes);
    return facilityTypes;
  } catch (error) {
    console.log("Error getting all facility types: ", error);
    throw error;
  }
};

const getFacilityById = (id, callback) => {
  Facility.findByPk(id)
    .then((facility) => {
      callback(null, facility);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const checkIfFacilityExists = async (id) => {
  try {
    const facility = await Facility.findByPk(id);
    if (facility) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error checking if facility exists: ", error);
    throw error;
  }
};

const addNewFacility = async (facility, callback) => {
  Facility.create({
    type_id: facility.type_id,
    facility_name: facility.facility_name,
    max_users: facility.max_users,
    price_per_hour: facility.price_per_hour,
    monday: facility.monday,
    tuesday: facility.tuesday,
    wednesday: facility.wednesday,
    thursday: facility.thursday,
    friday: facility.friday,
    saturday: facility.saturday,
    sunday: facility.sunday,
  })
    .then((facility) => {
      callback(null, facility);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const updateFacility = (id, updates, callback) => {
  Facility.update(
    {
      facility_name: updates.facility_name,
      max_users: updates.max_users,
      price_per_hour: updates.price_per_hour,
    },
    {
      where: {
        fac_id: id,
      },
    }
  )
    .then((facility) => {
      callback(null, facility);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const deleteFacility = (id, callback) => {
  Facility.destroy({
    where: {
      fac_id: id,
    },
  })
    .then((facility) => {
      callback(null, facility);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const findCoachById = async (coach_id) => {
  try {
    const coach = await Coaches.findByPk(coach_id);
    if (coach) {
      return coach;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting coach by id: ", error);
    throw error;
  }
};

const addNewCoach = async (coach, callback) => {
  try {
      Coaches.create({
        coach_id: coach.coach_id,
        type_id: coach.type_id,
        price_per_hour: coach.price_per_hour,
      })
        .then((coach) => {
          callback(null, coach);
        })
        .catch((err) => {
          callback(err, null);
        });
  }
  catch (error) {
    console.log("Error adding new coach: ", error);
    throw error;
  }
};

const addCoachTimeTable = async (records, callback) => {
  try {
    console.log("records from repository: ", records);
    const coachTimeTable = await CoachAvailableTimeTable.bulkCreate(
      records
    );
    callback(null, records);
  } catch (error) {
    console.log("Error adding coach timetable: ", error);
    throw error;
  }
};


module.exports = {
  getAllFacilities,
  getFacilityById,
  getAllFacilitiesByTypeId,
  // addNewFacility,
  // updateFacility,
  // deleteFacility,
  // getFacilityTypeByName,
  findFacilityTypeByName,
  addNewFacilityType,
  getAllFacilityTypes,
  addNewFacility,
  checkIfFacilityExists,
  updateFacility,
  findCoachById,
  addCoachTimeTable,
  addNewCoach,
};
