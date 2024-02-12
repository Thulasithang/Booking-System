const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const UserRoles = require('./userRoles');
const Permissions = require('./permissions');

const UserRolePermissions = sequelize.define(
    "user_role_permissions",
    {
        role_id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            allowNull: false,
            references: {
                model: UserRoles,
                key: 'role_id'
            }
        },
        permission_id: {
            type: DataTypes.SMALLINT,
            primaryKey: true, 
            allowNull: false,
            references: {
                model: Permissions,
                key: 'permission_id'
            }
        },
    },
    {
        timestamps: false,
    }
);

// UserRoles.belongsToMany(Permissions, {
//     through: UserRolePermissions,
// });

// Permissions.belongsToMany(UserRoles, {
//     through: UserRolePermissions,
// })

// UserRolePermissions.associate = (models) => {
//     models.UserRoles.hasMany(UserRolePermissions, {
//         foreignKey: 'role_id',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
    
//     models.Permissions.hasMany(UserRolePermissions, {
//         foreignKey: 'permission_id',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//     } )
// }

module.exports = UserRolePermissions;