const express = require('express');
const app = express();
const PORT = process.env.PORT || 8003;

const sequelize = require("./dbConfig");
const Facilities = require('./models/facilities');
const AvailableTimeTable = require('./models/availableTimeTable');
const FacilityType = require('./models/facilityType');
const Coaches = require('./models/coaches');

app.use(express.json());

// const facilityController = require("./controllers/facilityController");
// app.use("/", facilityController);

app.listen(PORT,  () => {
    console.log(`facilites service started on port ${PORT}`);
});

// (async () => {
//       try {
//         await FacilityType.sync({ force: true });
//         await Coaches.sync({ force: true });
//         await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
//         console.log("Database synchronized successfully");
//       } catch (error) {
//         console.error("Error syncing database:", error);
//       }
//     })();