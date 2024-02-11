const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const Permissions = require('./permissions');
const UserRolePermissions = require('./userRolePermissions');

const UserRoles = sequelize.define(
    "user_roles",
    {
        role_id: {
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
        }, 
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);

UserRoles.belongsToMany(Permissions, {
    through: UserRolePermissions,
});

module.exports = UserRoles;