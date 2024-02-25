const express = require('express');
const app = express();
const PORT = process.env.PORT || 8002;

const sequelize = require('./dbConfig');

app.use(express.json());

const bookingController = require('./controllers/bookingController');
app.use("/", bookingController);

// app.use("/", (req, res) =>{
//     res.json({ message: "Booking service" });
// })

app.listen(PORT, () => {
    console.log(`Booking service started on port ${PORT}`);
});