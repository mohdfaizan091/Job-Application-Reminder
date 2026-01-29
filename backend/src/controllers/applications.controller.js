const JobApplication = require("../models/JobApplication.model");

exports.createApplication = async (req, res) => {
  const { company, role } = req.body;

  const application = await JobApplication.create({
    userId: req.userId || "000000000000000000000000", // temp
    company,
    role,
  });

  res.status(201).json(application);
};

exports.getApplications = async (req, res) => {
  const applications = await JobApplication.find().sort({ createdAt: -1 });
  res.json(applications);
};
