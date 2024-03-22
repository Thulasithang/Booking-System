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
      coach_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "coaches",
          key: "coach_id",
        },
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // available_slots: {
    //   type: DataTypes.ARRAY(DataTypes.TIME),
    //   allowNull: false,
    // },
    // booked_players: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   allowNull: true,
    // },
    slot_remaining_players: {
      type: DataTypes.ARRAY(DataTypes.JSON), // [{slot: 'HH:mm', remaining_players: 5}]
    }
  },
  {
    timestamps: false,
  }
);

module.exports = AvailableTimeTable;
