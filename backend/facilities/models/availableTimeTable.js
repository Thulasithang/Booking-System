const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const AvailableTimeTable = sequelize.define(
  "available_timetable",
  {
    available_id: {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    available_slots: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: false,
    },
    booked_players: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = AvailableTimeTable;
