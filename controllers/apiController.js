// api controllers

const {
  generateFibonacci,
  filterPrimes,
  calculateHCF,
  calculateLCM,
} = require("../utils/mathOperations");
const { queryGeminiAI } = require("../utils/aiService");

// handles /bfhl endpoint
async function handleBFHL(req, res, next) {
  try {
    const body = req.body;
    const officialEmail =
      process.env.OFFICIAL_EMAIL || "not_configured@chitkara.edu.in";

    const operationType = Object.keys(body)[0];
    let data;

    switch (operationType) {
      case "fibonacci":
        const fibN = body.fibonacci;
        data = generateFibonacci(fibN);
        break;

      case "prime":
        const primeArray = body.prime;
        data = filterPrimes(primeArray);
        break;

      case "lcm":
        const lcmArray = body.lcm;
        data = calculateLCM(lcmArray);
        break;

      case "hcf":
        const hcfArray = body.hcf;
        data = calculateHCF(hcfArray);
        break;

      case "AI":
        const question = body.AI;
        data = await queryGeminiAI(question);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          error:
            "invalid operation, expected one of: fibonacci, prime, lcm, hcf, AI",
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: officialEmail,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

// handles /health endpoint
function handleHealth(req, res) {
  const officialEmail =
    process.env.OFFICIAL_EMAIL || "not_configured@chitkara.edu.in";

  res.status(200).json({
    is_success: true,
    official_email: officialEmail,
  });
}

module.exports = {
  handleBFHL,
  handleHealth,
};
