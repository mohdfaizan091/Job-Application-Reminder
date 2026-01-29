const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    executedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { _id: false }
);

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "APPLIED",
        "INTERVIEW_SCHEDULED",
        "FOLLOW_UP_SENT",
        "CLOSED",
      ],
      default: "APPLIED",
      index: true,
    },

    appliedAt: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    interviewDate: {
      type: Date,
    },

    actions: {
      type: [actionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
