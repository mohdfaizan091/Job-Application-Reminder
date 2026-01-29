const express = require("express");
const app = express();


app.use(express.json());

//routes
const healthRoute = require("./routes/health.routes");
app.use("/" ,healthRoute);


const applicationRoutes = require("./routes/application.routes");
app.use("/applications", applicationRoutes);

module.exports = app;