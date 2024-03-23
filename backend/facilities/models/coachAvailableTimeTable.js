const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const CoachAvailableTimeTable = sequelize.define(
  "coach_available_timetable",
  {
    coach_available_id: {
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    day_of_week: {
      type: DataTypes.STRING,
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
    slot_remaining_players: {
      type: DataTypes.ARRAY(DataTypes.JSONB), // [{slot: 'HH:mm', remaining_players: 5}]
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = CoachAvailableTimeTable;