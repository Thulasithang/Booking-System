const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const CoachExceptionTimeTable = sequelize.define(
  "coach_exception_timetable",
  {
    coach_exception_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
            model: "coach_facilities",
            key: "coach_id",
        },
    },
    exception_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    removed_slots: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = CoachExceptionTimeTable;
