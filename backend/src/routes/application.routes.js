const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplications,
} = require("../controllers/applications.controller");

router.post("/", createApplication);
router.get("/", getApplications);

module.exports = router;
