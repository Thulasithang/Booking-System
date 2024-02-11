const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const UserRoles = require('./userRoles');

const UserRolePermissions = sequelize.define(
    "user_role_permissions",
    {
        role_id: {
            type: DataTypes.SMALLINT,
            // primaryKey: true,
            // autoIncrement: true,
            // allowNull: false,
            references: {
                model: UserRoles,
                key: 'role_id'
            }
        },
        permission_id: {
            type: DataTypes.SMALLINT,
            // primaryKey: true,
            // autoIncrement: true,
            // allowNull: false,
            references: {
                model: 'permissions',
                key: 'permission_id'
            }
        },
    },
    {
        timestamps: false,
    }
);

module.exports = UserRolePermissions;