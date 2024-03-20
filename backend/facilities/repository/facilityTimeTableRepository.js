const { Op, QueryTypes } = require("sequelize");

const ExceptionTimeTable = require("../models/exceptionTimeTable");
const sequelize = require("../dbConfig");

const checkIfSlotExists = async (fac_id, exception_date, slots) => {
  try {
    const result = await ExceptionTimeTable.findAll({
      where: {
        fac_id: fac_id,
        exception_date: exception_date,
        removed_slots: {
          [Op.overlap]: slots,
        },
      },
    });
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error checking if slot exists: ", error);
    callback(error, null);
  }
};

const checkIfFacDateExists = async (fac_id, exception_date) => {
  try {
    const result = await ExceptionTimeTable.findOne({
      where: {
        fac_id: fac_id,
        exception_date: exception_date,
      },
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error checking if fac date exists: ", error);
    throw error;
  }
};

const addDisabledSlots = async (fac_id, exception_date, slots, callback) => {
  try {
    const disabledSlots = await ExceptionTimeTable.create({
      fac_id: fac_id,
      exception_date: exception_date,
      removed_slots: slots,
    });
    callback(null, disabledSlots);
  } catch (error) {
    console.log("Error adding disabled slots: ", error);
    callback(error, null);
  }
};

const getDisabledSlots = async (fac_id, date) => {
  try {
    const disabledSlots = await ExceptionTimeTable.findOne({
      where: {
        fac_id: fac_id,
        exception_date: date,
      },
      attributes: ["removed_slots"],
      raw: true, //This fetches raw data instead of the model instance
    });
    if (!disabledSlots) {
      return [];
    }
    return disabledSlots["removed_slots"];
  } catch (error) {
    console.log("Error getting disabled slots: ", error);
    throw error;
  }
};

const updateDisabledSlots = async (fac_id, exception_date, slots, callback) => {
  try {
    console.log("slots: ", slots);
    const result = await sequelize.transaction(async (t) => {
      if (Array.isArray(slots)) {
      slots.forEach(async (slot) => {
        await sequelize.query(
          "UPDATE exception_timetable SET removed_slots = ARRAY_APPEND(removed_slots, :slot) WHERE fac_id = :fac_id AND exception_date = :exception_date",
          {
            replacements: { slot, fac_id, exception_date },
            type: QueryTypes.UPDATE,
          },
          { transaction: t }
        );
      });
    } else {
      console.error('Slots is not an array.');
    }
    });
    callback(null, result);
  } catch (error) {
    console.log("Error updating disabled slots: ", error);
    callback(error, null);
  }
};

module.exports = {
  checkIfSlotExists,
  addDisabledSlots,
  updateDisabledSlots,
  getDisabledSlots,
  checkIfFacDateExists,
};
