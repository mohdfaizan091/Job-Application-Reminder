const mongoose = require("mongoose");

const reminderPreferenceSchema = new mongoose.Schema(
  {
    ruleName: {
      type: String,
      required: true, // FIRST_REMINDER, SECOND_REMINDER
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    afterDays: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    reminderPreferences: {
      type: [reminderPreferenceSchema],
      default: [
        { ruleName: "FIRST_REMINDER", afterDays: 7, enabled: true },
        { ruleName: "SECOND_REMINDER", afterDays: 14, enabled: true },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
