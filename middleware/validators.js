// request validation middleware

const {
  isPositiveInteger,
  isIntegerArray,
  isNonEmptyString,
  sanitizeString,
} = require("../utils/validators");

// validates bfhl request
function validateBFHLRequest(req, res, next) {
  try {
    const body = req.body;

    // check if body exists
    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      return res.status(400).json({
        is_success: false,
        error: "request body is required",
      });
    }

    const keys = Object.keys(body);

    // must have exactly one operation key
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "request must contain exactly one operation key",
      });
    }

    const operationType = keys[0];
    const value = body[operationType];
    const validOperations = ["fibonacci", "prime", "lcm", "hcf", "AI"];

    // validate operation type
    if (!validOperations.includes(operationType)) {
      return res.status(400).json({
        is_success: false,
        error: `invalid operation, expected one of: ${validOperations.join(", ")}`,
      });
    }

    // validate based on operation type
    switch (operationType) {
      case "fibonacci":
        if (!isPositiveInteger(value)) {
          return res.status(400).json({
            is_success: false,
            error: "fibonacci must be a positive integer",
          });
        }
        if (value > 50) {
          return res.status(400).json({
            is_success: false,
            error: "fibonacci value cannot exceed 50",
          });
        }
        break;

      case "prime":
        if (!isIntegerArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: "prime must be a non-empty array of integers",
          });
        }
        if (value.length > 1000) {
          return res.status(400).json({
            is_success: false,
            error: "array size cannot exceed 1000 elements",
          });
        }
        break;

      case "lcm":
      case "hcf":
        if (!isIntegerArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: `${operationType} must be a non-empty array of integers`,
          });
        }
        if (value.length < 2) {
          return res.status(400).json({
            is_success: false,
            error: `${operationType} requires at least 2 numbers`,
          });
        }
        if (value.length > 100) {
          return res.status(400).json({
            is_success: false,
            error: "array size cannot exceed 100 elements",
          });
        }
        if (value.some((num) => num === 0 && operationType === "lcm")) {
          return res.status(400).json({
            is_success: false,
            error: "lcm cannot be calculated with zero",
          });
        }
        break;

      case "AI":
        if (!isNonEmptyString(value)) {
          return res.status(400).json({
            is_success: false,
            error: "ai query must be a non-empty string",
          });
        }
        if (value.length > 500) {
          return res.status(400).json({
            is_success: false,
            error: "question length cannot exceed 500 characters",
          });
        }
        req.body.AI = sanitizeString(value);
        break;
    }

    next();
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      error: "validation error",
    });
  }
}

module.exports = {
  validateBFHLRequest,
};
