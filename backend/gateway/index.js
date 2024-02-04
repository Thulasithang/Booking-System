const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;


app.use("/users", proxy("http://localhost:8001/"));
app.use("/booking", proxy("http://localhost:8002/"));
app.use("/", proxy("http://localhost:8003/")); //facilites

app.listen(PORT, () => {
    console.log(`Gateway service started on port ${PORT}`);
});


