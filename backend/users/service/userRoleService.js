const express = require("express");
const router = express.Router();

const userRoleRepository = require("../repository/userRoleRepository");

const getAllUserRoles = async (callback) => {
    try{
        const userRoles = await userRoleRepository.getAllUserRoles();
        callback(null, userRoles);
    } catch (error) {
        throw error;
    }
};

const addNewUserRole = async (role, callback) => {
    try {
        // let lowerCaseTitle = role.title.toLowerCase()
        let lowerCaseTitle = role.title.toLowerCase();
        const newRole = {
            title: lowerCaseTitle,
            active: role.active,
        }
        console.log(newRole);

        await userRoleRepository.addNewUserRole(newRole, (err, addedRole) => {
            if (!err) {
                console.log("createdUser: ", addedRole);
                callback(null, "Role added successfully");
              } else {
                console.log("Error adding role from else: ", err.message); //Shows error if table name is incorrect
                callback(err, null);
              }
        });
    } catch (error) {
        console.log("Error adding role from from catch: ", error);
        throw error;
    }
}

module.exports = {
    getAllUserRoles,
    addNewUserRole
};