const express = require("express");
const app = express();


//routes
const healthRoute = require("./routes/health.routes");
app.use("/" ,healthRoute);


module.exports = app;