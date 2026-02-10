// main server file

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");
const { validateEnv } = require("./utils/validators");

// validate env variables
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

// security middleware
app.use(helmet());
app.use(cors());

// rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    is_success: false,
    error: "too many requests, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// routes
app.use("/", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "route not found",
  });
});

// global error handler
app.use(errorHandler);

// start server
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`official email: ${process.env.OFFICIAL_EMAIL}`);
  console.log(`environment: ${process.env.NODE_ENV || "development"}`);
});

// shutdown handler
process.on("SIGTERM", () => {
  console.log("shutting down");
  server.close(() => {
    console.log("process terminated");
  });
});

module.exports = app;
