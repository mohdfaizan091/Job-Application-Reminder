const app = require("./app");
const connectDB = require("./config/db");
const startReminderJob = require("./jobs/reminder.job");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port", PORT);

    startReminderJob(); //  background job starts here
  });
});
