#!/bin/bash

# Test Script for BFHL API
# Usage: ./test_api.sh [BASE_URL]

BASE_URL=${1:-http://localhost:3000}

echo "Testing BFHL API"
echo "Base URL: $BASE_URL"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    local expected_status=$5
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" = "$expected_status" ]; then
        echo -e "${GREEN}PASS: $name${NC}"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}FAIL: $name${NC}"
        echo "   Expected: $expected_status, Got: $http_code"
        echo "   Response: $body"
        FAILED=$((FAILED + 1))
    fi
}

# Run tests
echo "1. Health Check"
test_endpoint "GET /health" "GET" "/health" "" "200"
echo ""

echo "2. Fibonacci Tests"
test_endpoint "Fibonacci - Valid" "POST" "/bfhl" '{"fibonacci": 7}' "200"
test_endpoint "Fibonacci - Invalid (negative)" "POST" "/bfhl" '{"fibonacci": -5}' "400"
test_endpoint "Fibonacci - Invalid (zero)" "POST" "/bfhl" '{"fibonacci": 0}' "400"
echo ""

echo "3. Prime Tests"
test_endpoint "Prime - Valid" "POST" "/bfhl" '{"prime": [2,4,7,9,11]}' "200"
test_endpoint "Prime - Invalid (not array)" "POST" "/bfhl" '{"prime": 7}' "400"
echo ""

echo "4. LCM Tests"
test_endpoint "LCM - Valid" "POST" "/bfhl" '{"lcm": [12,18,24]}' "200"
test_endpoint "LCM - Invalid (single element)" "POST" "/bfhl" '{"lcm": [12]}' "400"
echo ""

echo "5. HCF Tests"
test_endpoint "HCF - Valid" "POST" "/bfhl" '{"hcf": [24,36,60]}' "200"
test_endpoint "HCF - Invalid (empty)" "POST" "/bfhl" '{"hcf": []}' "400"
echo ""

echo "6. Validation Tests"
test_endpoint "Multiple keys" "POST" "/bfhl" '{"fibonacci": 5, "prime": [2,3]}' "400"
test_endpoint "Invalid operation" "POST" "/bfhl" '{"invalid": 123}' "400"
test_endpoint "Empty body" "POST" "/bfhl" '{}' "400"
echo ""

# Results
echo "============================="
echo "Results: $PASSED passed, $FAILED failed"
echo "============================="

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}all tests passed${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed${NC}"
    exit 1
fi
