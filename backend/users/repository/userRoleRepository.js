const UserRoles = require("../models/userRoles");
const Permissions = require("../models/permissions");
const UserRolePermissions = require("../models/userRolePermissions");

const sequelize = require("../dbConfig");

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
    const roleExists = await UserRoles.findOne({
      where: { title: newRole.title },
    });
    if (roleExists) {
      callback(null, "Role already exists");
      return;
    }
    const addedRole = await UserRoles.create({
      title: newRole.title,
      active: newRole.active,
    });
    console.log("New User role: ", addedRole);
    callback(null, `${addedRole.title} role added successfully`);
  } catch (error) {
    callback(error, null);
  }
};

const deleteUserRole = async (id, callback) => {
  try {
    console.log("id: ", id);
    const deletedRole = await UserRoles.destroy({
      where: { role_id: id },
    });
    console.log("Deleted role: ", deletedRole);
    callback(null, `Role with id ${id} deleted successfully`);
  } catch (error) {
    callback(error, null);
  }
};

const getAllPermissions = async () => {
  try {
    const permissions = await Permissions.findAll();
    return permissions;
  } catch (error) {
    throw error;
  }
};

const addNewPermission = async (newPermission, callback) => {
  try {
    const permissionExists = await Permissions.findOne({
      where: { title: newPermission.title },
    });
    if (permissionExists) {
      callback(null, "Permission already exists");
      return;
    }
    const addedPermission = await Permissions.create({
      title: newPermission.title,
      active: newPermission.active,
    });
    console.log("New Permission: ", addedPermission);
    callback(null, `${addedPermission.title} permission added successfully`);
  } catch (error) {
    callback(error, null);
  }
};

const updatePermission = async (id, permission, callback) => {
  try {
    const updatedPermission = await Permissions.update(
      {
        title: permission.title,
        active: permission.active,
      },
      { where: { permission_id: id } }
    );
    console.log("Updated permission: ", updatedPermission);
    callback(null, `Permission with id ${id} updated successfully`);
  } catch (error) {
    callback(error, null);
  }
};

const addRolePermission = async (permissionList, role_id, callback) => {
  try {
    const existsList = [];
    for ( const list_permission_id of permissionList) {
      const [rolePermission, created] = await UserRolePermissions.findOrCreate({
        where: {
          role_id: role_id,
          permission_id: list_permission_id,
        },
        defaults: {
          role_id: role_id,
          permission_id: list_permission_id,
        },
      });
      if (created) {
        console.log(
          `Permission ${list_permission_id} was added to role ${role_id}`
        );
        existsList.push(`Permission ${list_permission_id} was added to role ${role_id}`);
      } else if (!created) {
          existsList.push(`Permission ${list_permission_id} already exists for role ${role_id}`);
      }
    };
      callback(null, existsList);

  } catch (error) {
    console.log("Error: ", error);
    callback(error, null);
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
