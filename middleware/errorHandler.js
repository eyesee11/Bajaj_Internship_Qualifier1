// global error handler

function errorHandler(err, req, res, next) {
  console.error("error:", err.message);

  // default error
  let statusCode = 500;
  let errorMessage = "internal server error";

  // handle specific error types
  if (err.message.includes("API key")) {
    statusCode = 503;
    errorMessage = "ai service config error";
  } else if (err.message.includes("rate limit")) {
    statusCode = 429;
    errorMessage = "rate limit exceeded";
  } else if (err.message.includes("timeout")) {
    statusCode = 504;
    errorMessage = "request timeout";
  } else if (err.message.includes("unavailable")) {
    statusCode = 503;
    errorMessage = "service temporarily unavailable";
  } else if (err.name === "SyntaxError") {
    statusCode = 400;
    errorMessage = "invalid json format";
  }

  // send error response
  res.status(statusCode).json({
    is_success: false,
    error: errorMessage,
  });
}

module.exports = {
  errorHandler,
};
