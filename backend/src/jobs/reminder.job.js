const JobApplication = require("../models/JobApplication.model");
const rules = require("./reminder.rules");
const { sendNotification } = require("../services/notification.service");
const User = require("../models/User.model");

const CHECK_INTERVAL = 1000 * 10; // temp=10sec

async function runReminderCheck() {
  const now = new Date();

  console.log("🔄 Reminder job running at", now.toISOString());

  // Loop through all reminder rules
  for (const rule of rules) {
    const users = await User.find({
      "reminderPreferences.ruleName": rule.name,
      "reminderPreferences.enabled": true,
    });

    for (const user of users) {
      const pref = user.reminderPreferences.find(
        (p) => p.ruleName === rule.name && p.enabled
      );

      if (!pref) continue;

      const cutoffDate = new Date(
        now.getTime() - pref.afterDays * 24 * 60 * 60 * 1000
      );

      const applications = await JobApplication.find({
        userId: user._id,
        status: rule.status,
        appliedAt: { $lte: cutoffDate },
        "actions.type": { $ne: rule.actionType },
      });

      for (const app of applications) {
        sendNotification({
          type: rule.name,
          company: app.company,
          role: app.role,
        });

        // Record action (IDEMPOTENCY)
        app.actions.push({
          type: rule.actionType,
          executedAt: now,
        });

        await app.save();
      }
    }  
  }  
}  

function startReminderJob() {
  setInterval(runReminderCheck, CHECK_INTERVAL);
}

module.exports = startReminderJob;