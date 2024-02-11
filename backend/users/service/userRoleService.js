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

module.exports = {
    getAllUserRoles
};