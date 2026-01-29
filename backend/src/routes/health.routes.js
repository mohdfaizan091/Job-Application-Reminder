const router = require("express").Router();

router.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is healthy" });
});

module.exports = router;