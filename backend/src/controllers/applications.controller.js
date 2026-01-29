const JobApplication = require("../models/JobApplication.model");

exports.createJobApplication = async (req, res) => {
  const { company, role } = req.body;
  try{
    if (!company || !role) {
      return res.status(400).json({ message: "company and role are required" });
    }

  const application = await JobApplication.create({
    userId: req.userId || "000000000000000000000000", // temp
    company,
    role,
  });

  res.status(201).json(application);
  } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
exports.getJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
