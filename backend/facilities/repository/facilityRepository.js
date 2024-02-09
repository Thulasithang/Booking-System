const { where } = require("sequelize");
const Facility = require("../models/facility");

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
  getAllFacilities,
  getFacilityById,
  addNewFacility,
  updateFacility,
  deleteFacility,
};
