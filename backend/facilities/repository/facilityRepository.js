const { where } = require("sequelize");
const Facility = require("../models/facilities");
const FacilityType = require("../models/facilityType");

const getAllFacilities = (callback) => {
  Facility.findAll()
    .then((facilities) => {
      callback(null, facilities);
    })
    .catch((err) => {
      callback(err, null);
      console.log(err);
    });
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

const getFacilityById = (id, callback) => {
  Facility.findByPk(id)
    .then((facility) => {
      callback(null, facility);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const addNewFacility = (fac_id, type, available, price_per_hour, callback) => {
  Facility.create({
    fac_id: fac_id,
    type: type,
    available: available,
    price_per_hour: price_per_hour,
  })
    .then((facility) => {
      callback(null, facility);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const updateFacility = (id, type, available, price_per_hour, callback) => {
  Facility.update(
    {
      type: type,
      available: available,
      price_per_hour: price_per_hour,
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

module.exports = {
  // getAllFacilities,
  // getFacilityById,
  // addNewFacility,
  // updateFacility,
  // deleteFacility,
  // getFacilityTypeByName,
  findFacilityTypeByName,
  addNewFacilityType,
};
