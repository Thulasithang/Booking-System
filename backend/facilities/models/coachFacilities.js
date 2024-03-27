const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const coachFacilities = sequelize.define(
  "coach_facilities",
  {
    coach_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    type_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: "facility_type",
        key: "type_id",
      },
    },
    coach_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coach_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coach_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coach_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coach_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = coachFacilities;