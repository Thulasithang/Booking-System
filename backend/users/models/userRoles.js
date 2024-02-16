const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

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
            // notEmpty: true,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }, 
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        timestamps: false,
    }
);

// UserRoles.associate = (models) => {
//     UserRoles.belongsToMany(models.Permissions, {
//         through: models.UserRolePermissions,
//     });
// };

module.exports = UserRoles;