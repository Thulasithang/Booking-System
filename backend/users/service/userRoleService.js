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
        if (role.active === null || role.active === undefined) {
            role.active = true;
        }

        const newRole = {
            title: lowerCaseTitle,
            active: role.active 
        }
        console.log(newRole);

        await userRoleRepository.addNewUserRole(newRole, (err, addedRole) => {
            if (!err) {
                console.log("createdUser: ", addedRole);
                callback(null, addedRole);
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

const deleteUserRole = async (id, callback) => {
    try {
        await userRoleRepository.deleteUserRole(id, (err, deletedRole) => {
            if (!err) {
                console.log("deletedRole: ", deletedRole);
                callback(null, deletedRole);
              } else {
                console.log("Error deleting role from else: ", err.message); //Shows error if table name is incorrect
                callback(err, null);
              }
        });
    } catch (error) {
        console.log("Error deleting role from catch: ", error);
        throw error;
    }
}

const getAllPermissions = async (callback) => {
    try {
        const permissions = await userRoleRepository.getAllPermissions();
        callback(null, permissions);
    } catch (error) {
        throw error;
    }
};

const addNewPermission = async (permission, callback) => {
    try {
        let lowerCaseTitle = permission.title.toLowerCase();
        if (permission.active === null || permission.active === undefined) {
            permission.active = true;
        }

        const newPermission = {
            title: lowerCaseTitle,
            active: permission.active
        }   
        console.log(newPermission);
        await userRoleRepository.addNewPermission(newPermission, (err, addedPermission) => {
            if (!err) {
                callback(null, addedPermission);
            } else {
                callback(err, null);
            }
        });
    } catch (error) {
        throw error;
    }
}

const updatePermission = async (id, permission, callback) => {
    try {
        let lowerCaseTitle = permission.title.toLowerCase();
        const updatedPermission = {
            title: lowerCaseTitle,
            active: permission.active
        }
        console.log(updatedPermission);
        await userRoleRepository.updatePermission(id, updatedPermission, (err, updatedPermission) => {
            if (!err) {
                callback(null, updatedPermission);
            } else {
                callback(err, null);
            }
        });
    } catch (error) {
        throw error;
    }
}

const addRolePermission = async (rolePermission, callback) => {
    try {
        const permissionList = rolePermission.permission_id_list;
        console.log("Permission list from service: ",permissionList);
        const role_id = rolePermission.role_id;
        await userRoleRepository.addRolePermission(permissionList, role_id, (err, addedRolePermission) => {
            if (!err) {
                callback(null, addedRolePermission);
            } else {
                callback(err, null);
            }
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUserRoles,
    addNewUserRole,
    deleteUserRole,
    getAllPermissions,
    addNewPermission,
    updatePermission,
    addRolePermission,
};