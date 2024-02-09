const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const UserLoginInfo = require("./userLoginInfo");

const UserAccount = sequelize.define(
  "user_account",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      notEmpty: true,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    registered_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    role_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

UserAccount.hasOne(UserLoginInfo, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = UserAccount;
