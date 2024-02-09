const path = require("path");
require('dotenv').config({
    override: true,
    path: path.join(__dirname, "./.env")
});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('booking_facilities', 'postgres', '1234', {
    host: process.env.HOST,
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});

module.exports = sequelize;