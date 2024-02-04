const client = require("../dbConnection");

client.connect();

const getAllFacilities = (callback) => {
  client.query(`SELECT * FROM facilities`, (err, res) => {
    if (!err) {
      callback(null, res.rows);
    } else {
      callback("Err", null);
    }
  });
};

const getFacilityById = (id, callback) => {
  client.query(`SELECT * FROM facilities WHERE fac_id = ${id}`, (err, res) => {
    if (!err) {
      callback(null, res.rows);
    } else {
      callback(err, null);
    }
  });
};

const addNewFacility = (type, available, price_per_hour, callback) => {
  client.query(
    `INSERT INTO facilities (type, available, price_per_hour) VALUES ('${type}', ${available}, ${price_per_hour})`,
    (err, res) => {
      if (!err) {
        callback(null, res.rows);
      } else {
        callback(err, null);
      }
    }
  );
};

const updateFacility = (id, type, available, price_per_hour, callback) => {
  client.query(
    `UPDATE facilities SET type = '${type}', available = ${available}, price_per_hour= ${price_per_hour} WHERE fac_id = ${id}`,
    (err, res) => {
      if (!err) {
        callback(null, res);
      } else {
        callback(err, null);
      }
    }
  );
};

const deleteFacility = (id, callback) => {
  client.query(`DELETE FROM facilities WHERE fac_id = ${id}`, (err, res) => {
    if (!err) {
      callback(null, res);
    } else {
      callback(err, null);
    }
  });
};
module.exports = {
  getAllFacilities,
  getFacilityById,
  addNewFacility,
  updateFacility,
  deleteFacility
};
