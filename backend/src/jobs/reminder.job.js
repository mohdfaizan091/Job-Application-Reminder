const JobApplication = require("../models/JobApplication.model");
const rules = require("./reminder.rules");

const CHECK_INTERVAL = 1000 * 10; // temp=10sec

async function runReminderCheck() {
  const now = new Date();

  console.log("🔄 Reminder job running at", now.toISOString());

  // Loop through all reminder rules
  for (const rule of rules) {
    const cutoffDate = new Date(
      now.getTime() - rule.afterDays * 24 * 60 * 60 * 1000
    );

    const applications = await JobApplication.find({
      status: rule.status,
      appliedAt: { $lte: cutoffDate },
      "actions.type": { $ne: rule.actionType },
    });

    for (const app of applications) {
      console.log(
        `⏰ ${rule.name} triggered for ${app.company} - ${app.role}`
      );

      // Record action (IDEMPOTENCY)
      app.actions.push({
        type: rule.actionType,
        executedAt: now,
      });

      await app.save();
    }
  }
}

function startReminderJob() {
  setInterval(runReminderCheck, CHECK_INTERVAL);
}

module.exports = startReminderJob;
