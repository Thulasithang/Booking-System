const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Facilities = require("./facilities");

const FacilityType = sequelize.define(
  "facility_type",
  {
    type_id: {
      //Identity generated by default. Therefore can specify fac_id if needed
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    small_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
    large_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
  },
  {
    timestamps: false,
  }
);

FacilityType.hasMany(Facilities, {
  foreignKey: "type_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


module.exports = FacilityType;
