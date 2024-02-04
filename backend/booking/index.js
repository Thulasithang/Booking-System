const express = require('express');
const app = express();
const PORT = process.env.PORT || 8002;

app.use(express.json());

app.use("/", (req, res) =>{
    res.json({ message: "Booking service" });
})

app.listen(PORT, () => {
    console.log(`Booking service started on port ${PORT}`);
});