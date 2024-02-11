const UserRoles = require('../models/userRoles');

const sequelize = require('../dbConfig');

const getAllUserRoles = async () => {
    try {
        const userRoles = await UserRoles.findAll();
        return userRoles;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUserRoles
};