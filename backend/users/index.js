const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;

const UserRolePermissions = require("./models/userRolePermissions");
const Permissions = require("./models/permissions");
const UserRoles = require("./models/userRoles");

const sequelize = require("./dbConfig");

app.use(express.json());

const userController = require("./controllers/userController");
app.use("/", userController);

const userRoleController = require("./controllers/userRoleController");
app.use("/roles", userRoleController);

app.listen(PORT, () => {
  console.log(`users service started on port ${PORT}`);
});

UserRoles.associate = () => {
UserRoles.belongsToMany(Permissions, {
  through: UserRolePermissions,
  foreignKey: "permission_id",
  targetKey: "permission_id",
});
};

Permissions.associate = () => {
  Permissions.belongsToMany(UserRoles, {
    through: UserRolePermissions,
    foreignKey: "role_id",
    targetKey: "role_id",
  });
};


/*
* Use the below code segment to drop existing tables in the database and create new tables.
* This will delete all of the data. Be careful when using this.
*/

// (async () => {
//   try {
//     await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
//     console.log("Database synchronized successfully");
//   } catch (error) {
//     console.error("Error syncing database:", error);
//   }
// })();

