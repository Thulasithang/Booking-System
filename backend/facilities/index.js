const express = require('express');
const app = express();
const PORT = process.env.PORT || 8003;

app.use(express.json());

const facilityController = require("./controllers/facilityController");
app.use("/", facilityController);

app.listen(PORT,  () => {
    console.log(`facilites service started on port ${PORT}`);
});

