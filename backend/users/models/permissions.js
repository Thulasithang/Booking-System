const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const UserRolePermissions = require('./userRolePermissions');

const Permissions = sequelize.define(
    "permissions",
    {
        permission_id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            notEmpty: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        timestamps: false,
    }
);

Permissions.belongsToMany(UserRoles, {
    through: UserRolePermissions,
});

module.exports = Permissions;