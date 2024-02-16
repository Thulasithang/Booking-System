const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

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
            unique: true,
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

// Permissions.associate = (models) => {
//     Permissions.belongsToMany(models.UserRoles, {
//         through: models.UserRolePermissions,
//     })
// };

module.exports = Permissions;