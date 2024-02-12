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

const addNewUserRole = async (newRole, callback) => {
    try {
        console.log(newRole.active);
    const addedRole = await UserRoles.create(
        {
            title: newRole.title,
            active: newRole.active
        }
    );
    console.log("New User role: ", addedRole );
    callback(null, addedRole);
    } catch (error) {
        callback(error, null);
    }
};


module.exports = {
    getAllUserRoles,
    addNewUserRole
};