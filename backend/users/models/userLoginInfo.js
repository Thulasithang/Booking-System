const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const UserLoginInfo = sequelize.define(
  "user_login_info",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      notEmpty: true,
      validate: {
        isEmail: true,
      }
    },
    password_hash: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password_salt: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = UserLoginInfo;
