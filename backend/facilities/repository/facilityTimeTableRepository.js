const { Op } = require("sequelize");
const ExceptionTimeTable = require("../models/exceptionTimeTable");

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

module.exports = {
  checkIfSlotExists,
  addDisabledSlots,
};
