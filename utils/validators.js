// input validators

// check if positive integer
function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

// check if integer array
function isIntegerArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => Number.isInteger(item))
  );
}

// check if non-empty string
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

// validate environment variables
function validateEnv() {
  const required = ["OFFICIAL_EMAIL", "GEMINI_API_KEY"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`missing env vars: ${missing.join(", ")}`);
    console.warn("create a .env file from .env.example");
  }

  // validate email format
  const email = process.env.OFFICIAL_EMAIL;
  if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    console.warn("invalid email format");
  }
}

// clean string input
function sanitizeString(input) {
  if (typeof input !== "string") return "";
  return input.trim().substring(0, 500);
}

module.exports = {
  isPositiveInteger,
  isIntegerArray,
  isNonEmptyString,
  validateEnv,
  sanitizeString,
};
