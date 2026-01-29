const router = require("express").Router();
const {
  createJobApplication,
  getJobApplications,
} = require("../controllers/applications.controller");

router.post("/", createJobApplication);
router.get("/", getJobApplications);

module.exports = router;
