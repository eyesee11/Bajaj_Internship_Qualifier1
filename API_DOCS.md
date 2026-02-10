# API Documentation

## Base URL

- Local: `http://localhost:3000`
- Production: `https://your-deployment-url.com`

## Authentication

No authentication required.

## Rate Limiting

- Window: 15 minutes
- Max requests: 100 per IP
- Response on limit: `429 Too Many Requests`

---

## Endpoints

### 1. GET /health

Health check endpoint to verify API status.

**Request:**

```http
GET /health
```

**Response:** `200 OK`

```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in"
}
```

---

### 2. POST /bfhl

Main endpoint for mathematical operations and AI queries.

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**
Must contain exactly ONE of the following operations:

#### Operation: fibonacci

Generate Fibonacci series.

**Input:**

- Type: Positive integer
- Range: 1-50
- Description: Number of Fibonacci terms to generate

**Request:**

```json
{
  "fibonacci": 7
}
```

**Response:** `200 OK`

```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

**Errors:**

- `400 Bad Request` - Invalid input (negative, zero, non-integer, > 50)

---

#### Operation: prime

Filter prime numbers from array.

**Input:**

- Type: Array of integers
- Size: 1-1000 elements
- Description: Array to filter for prime numbers

**Request:**

```json
{
  "prime": [2, 4, 7, 9, 11, 15, 17]
}
```

**Response:** `200 OK`

```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [2, 7, 11, 17]
}
```

**Errors:**

- `400 Bad Request` - Not an array, empty array, non-integers, > 1000 elements

---

#### Operation: lcm

Calculate Lowest Common Multiple.

**Input:**

- Type: Array of integers
- Size: 2-100 elements
- Constraint: No zeros allowed
- Description: Numbers to calculate LCM for

**Request:**

```json
{
  "lcm": [12, 18, 24]
}
```

**Response:** `200 OK`

```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 72
}
```

**Errors:**

- `400 Bad Request` - Not array, < 2 elements, > 100 elements, contains zero

---

#### Operation: hcf

Calculate Highest Common Factor (GCD).

**Input:**

- Type: Array of integers
- Size: 2-100 elements
- Description: Numbers to calculate HCF for

**Request:**

```json
{
  "hcf": [24, 36, 60]
}
```

**Response:** `200 OK`

```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 12
}
```

**Errors:**

- `400 Bad Request` - Not array, < 2 elements, > 100 elements, non-integers

---

#### Operation: AI

Ask AI a question (powered by Google Gemini).

**Input:**

- Type: String
- Length: 1-500 characters
- Description: Question to ask AI

**Request:**

```json
{
  "AI": "What is the capital city of Maharashtra?"
}
```

**Response:** `200 OK`

```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": "Mumbai"
}
```

**Errors:**

- `400 Bad Request` - Empty string, > 500 characters
- `503 Service Unavailable` - AI service configuration error
- `504 Gateway Timeout` - AI request timeout

---

## Error Responses

All errors follow this format:

```json
{
  "is_success": false,
  "error": "Error description"
}
```

### Common Error Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 400  | Bad Request - Invalid input             |
| 404  | Not Found - Invalid endpoint            |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error - Server issue    |
| 503  | Service Unavailable - AI service issue  |
| 504  | Gateway Timeout - Request timeout       |

### Error Examples

**Multiple operations:**

```json
{
  "is_success": false,
  "error": "Request must contain exactly one operation key"
}
```

**Invalid operation:**

```json
{
  "is_success": false,
  "error": "Invalid operation. Expected one of: fibonacci, prime, lcm, hcf, AI"
}
```

**Invalid data type:**

```json
{
  "is_success": false,
  "error": "fibonacci must be a positive integer"
}
```

---

## Test Cases

### Boundary Conditions

**Fibonacci edge cases:**

- `{"fibonacci": 1}` → `[0]`
- `{"fibonacci": 2}` → `[0, 1]`
- `{"fibonacci": 50}` → Valid (max allowed)
- `{"fibonacci": 51}` → Error (exceeds limit)

**Prime edge cases:**

- `{"prime": [1]}` → `[]` (1 is not prime)
- `{"prime": [2]}` → `[2]` (smallest prime)
- `{"prime": [-5, -3, -2]}` → `[]` (negatives not prime)

**LCM edge cases:**

- `{"lcm": [1, 1]}` → `1`
- `{"lcm": [2, 3, 5]}` → `30` (coprime numbers)

**HCF edge cases:**

- `{"hcf": [12, 12]}` → `12` (same numbers)
- `{"hcf": [7, 13]}` → `1` (coprime)

**AI edge cases:**

- Single word questions
- Complex multi-sentence questions
- Questions with special characters

---

## Code Examples

### JavaScript (fetch)

```javascript
// Fibonacci
const response = await fetch("http://localhost:3000/bfhl", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fibonacci: 7 }),
});
const data = await response.json();
console.log(data);
```

### Python (requests)

```python
import requests

response = requests.post(
    'http://localhost:3000/bfhl',
    json={'fibonacci': 7}
)
print(response.json())
```

### cURL

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

---

## Response Time

- Typical: < 200ms
- AI queries: < 3s
- Timeout: 10s

## Security

- Input validation on all requests
- Request size limit: 10KB
- Sanitized error messages
- Rate limiting enabled
- CORS enabled for all origins
