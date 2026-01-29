const express = require("express");
const cors = require("cors");
const app = express();



app.use(express.json());
app.use(cors());

//routes
const healthRoute = require("./routes/health.routes");
app.use("/" ,healthRoute);


const jobApplicationRoutes = require("./routes/jobApplication.routes");
app.use("/applications", jobApplicationRoutes);


module.exports = app;