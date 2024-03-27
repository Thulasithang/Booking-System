const express = require('express');
const app = express();
const PORT = process.env.PORT || 8003;

const sequelize = require("./dbConfig");
const Facilities = require('./models/facilities');
const AvailableTimeTable = require('./models/availableTimeTable');
const FacilityType = require('./models/facilityType');
const Coaches = require('./models/coachFacilities');

app.use(express.json());



const facilityController = require("./controllers/facilityController");
app.use("/", facilityController);

const facilityTimeTableController = require("./controllers/facilityTimeTableController");
const CoachAvailableTimeTable = require('./models/coachAvailableTimeTable');
const CoachExceptionTimeTable = require('./models/coachExceptionTimeTable');
app.use("/tt", facilityTimeTableController);

// (async () => {
//     try {
//         await CoachAvailableTimeTable.sync({ alter: true });
//         console.log("CoachAvailableTimeTable synchronized successfully");
//     }
//     catch (error) {
//         console.error("Error syncing CoachAvailableTimeTable:", error);
//     }
// });
//  Coaches.sync({ force: true });
// Coaches.sync({ alter: true });

app.listen(PORT,  () => {
    console.log(`facilites service started on port ${PORT}`);
});

// (async () => {
//       try {
//           await Coaches.sync({ force: true });
//         await FacilityType.sync({ force: true });
//         // await CoachAvailableTimeTable.sync({ force: true });
//         await CoachExceptionTimeTable.sync({ force: true });
//         await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
//         console.log("Database synchronized successfully");
//       } catch (error) {
//         console.error("Error syncing database:", error);
//       }
//     })();


