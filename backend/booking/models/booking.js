const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Booking = sequelize.define(
  "booking",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //     model: "user_account",
      //     key: "user_id",
      // },
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    booking_time: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.RANGE(DataTypes.DATETIME),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    booked_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    coach_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coach_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Booking;
