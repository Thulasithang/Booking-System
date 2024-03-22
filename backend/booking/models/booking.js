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
    },
    need_coaching: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // if coach is not required, then coach_id is null
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // if coach is required, then facility_id is null
    },
    booked_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date_booked: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    slots_booked: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    booking_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",   // pending, confirmed, cancelled by user, cancelled by coach
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Booking;
