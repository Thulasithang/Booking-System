const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Coaches = sequelize.define(
  "coach_facilities",
  {
    coach_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: "facility_type",
        key: "type_id",
      },
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    max_students: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Coaches;