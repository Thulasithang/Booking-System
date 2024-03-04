const { Sequlize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const ExceptionTimeTable = sequelize.define(
  "exception_timetable",
  {
    exception_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fac_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "facilities",
        key: "fac_id",
      },
    },
    exception_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    removed_slots: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ExceptionTimeTable;
