// api routes

const express = require("express");
const router = express.Router();
const { handleBFHL, handleHealth } = require("../controllers/apiController");
const { validateBFHLRequest } = require("../middleware/validators");

// main endpoint
router.post("/bfhl", validateBFHLRequest, handleBFHL);

// health check
router.get("/health", handleHealth);

// root
router.get("/", (req, res) => {
  res.json({
    message: "bfhl api",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      bfhl: "POST /bfhl",
    },
  });
});

module.exports = router;
