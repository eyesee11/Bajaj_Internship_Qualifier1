// simple test suite

const testCases = [
  {
    name: "Health Check",
    method: "GET",
    url: "/health",
    expectedStatus: 200,
  },
  {
    name: "Fibonacci - Valid",
    method: "POST",
    url: "/bfhl",
    body: { fibonacci: 7 },
    expectedStatus: 200,
    expectedData: [0, 1, 1, 2, 3, 5, 8],
  },
  {
    name: "Prime - Valid",
    method: "POST",
    url: "/bfhl",
    body: { prime: [2, 4, 7, 9, 11] },
    expectedStatus: 200,
    expectedData: [2, 7, 11],
  },
  {
    name: "LCM - Valid",
    method: "POST",
    url: "/bfhl",
    body: { lcm: [12, 18, 24] },
    expectedStatus: 200,
    expectedData: 72,
  },
  {
    name: "HCF - Valid",
    method: "POST",
    url: "/bfhl",
    body: { hcf: [24, 36, 60] },
    expectedStatus: 200,
    expectedData: 12,
  },
  {
    name: "Fibonacci - Invalid (negative)",
    method: "POST",
    url: "/bfhl",
    body: { fibonacci: -5 },
    expectedStatus: 400,
  },
  {
    name: "Prime - Invalid (not array)",
    method: "POST",
    url: "/bfhl",
    body: { prime: 7 },
    expectedStatus: 400,
  },
  {
    name: "Multiple Keys",
    method: "POST",
    url: "/bfhl",
    body: { fibonacci: 5, prime: [2, 3] },
    expectedStatus: 400,
  },
  {
    name: "Invalid Operation",
    method: "POST",
    url: "/bfhl",
    body: { invalid: 123 },
    expectedStatus: 400,
  },
  {
    name: "Empty Body",
    method: "POST",
    url: "/bfhl",
    body: {},
    expectedStatus: 400,
  },
];

async function runTests(baseUrl = "http://localhost:3000") {
  console.log("running api tests\n");
  console.log(`base url: ${baseUrl}\n`);

  let passed = 0;
  let failed = 0;

  for (const test of testCases) {
    try {
      const options = {
        method: test.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const response = await fetch(baseUrl + test.url, options);
      const data = await response.json();

      const statusMatch = response.status === test.expectedStatus;
      const dataMatch = test.expectedData
        ? JSON.stringify(data.data) === JSON.stringify(test.expectedData)
        : true;

      if (statusMatch && dataMatch) {
        console.log(`PASS: ${test.name}`);
        passed++;
      } else {
        console.log(`FAIL: ${test.name}`);
        console.log(
          `   expected status: ${test.expectedStatus}, got: ${response.status}`,
        );
        if (test.expectedData) {
          console.log(`   expected data: ${JSON.stringify(test.expectedData)}`);
          console.log(`   got data: ${JSON.stringify(data.data)}`);
        }
        failed++;
      }
    } catch (error) {
      console.log(`FAIL: ${test.name} - error: ${error.message}`);
      failed++;
    }
  }

  console.log(`\nresults: ${passed} passed, ${failed} failed`);
  return failed === 0;
}

// run tests if executed directly
if (require.main === module) {
  const baseUrl = process.argv[2] || "http://localhost:3000";
  runTests(baseUrl).then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { runTests };
