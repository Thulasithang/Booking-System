const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const AvailableTimeTable = require("./availableTimeTable");
const ExceptionTimeTable = require("./exceptionTimeTable");

const Facilities = sequelize.define(
  "facilities",
  {
    fac_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    facility_name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    max_users: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    monday: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
    tuesday: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
    wednesday: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
    thursday: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
    friday: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
    saturday: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
    sunday: {
      type: DataTypes.ARRAY(DataTypes.TIME),
      allowNull: true,
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Facilities.hasMany(AvailableTimeTable, {
  foreignKey: "fac_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Facilities.hasMany(ExceptionTimeTable, {
    foreignKey: "fac_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    });

module.exports = Facilities;
