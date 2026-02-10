# BFHL REST API

Production-ready REST API with mathematical operations and AI integration.

## Features

- Fibonacci series generation
- Prime number filtering
- LCM calculation
- HCF calculation
- AI-powered Q&A (Google Gemini)
- Input validation & error handling
- Rate limiting & security
- Health check endpoint

## API Endpoints

### POST /bfhl

Main endpoint supporting 5 operations:

#### 1. Fibonacci Series

```json
Request:
{
  "fibonacci": 7
}

Response:
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

#### 2. Prime Numbers

```json
Request:
{
  "prime": [2, 4, 7, 9, 11]
}

Response:
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

#### 3. LCM (Lowest Common Multiple)

```json
Request:
{
  "lcm": [12, 18, 24]
}

Response:
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 72
}
```

#### 4. HCF (Highest Common Factor)

```json
Request:
{
  "hcf": [24, 36, 60]
}

Response:
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 12
}
```

#### 5. AI Query

```json
Request:
{
  "AI": "What is the capital city of Maharashtra?"
}

Response:
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": "Mumbai"
}
```

### GET /health

Health check endpoint.

```json
Response:
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in"
}
```

## Setup & Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Google Gemini API key

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd Bajaj_Internship
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
PORT=3000
NODE_ENV=production
OFFICIAL_EMAIL=your.email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Get Google Gemini API Key

1. Visit https://aistudio.google.com
2. Sign in with Google account
3. Click "Get API Key"
4. Create API key in project
5. Copy and paste in `.env`

### 5. Run Server

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server will run on `http://localhost:3000`

## Testing

Test endpoints using the included test file:

```bash
node test.js
```

Or use curl:

```bash
# Health check
curl http://localhost:3000/health

# Fibonacci
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'

# Prime numbers
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,4,7,9,11]}'
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

### Deploy to Railway

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Deploy to Render

1. Create new Web Service
2. Connect repository
3. Add environment variables
4. Deploy

## Project Structure

```
Bajaj_Internship/
├── controllers/
│   └── apiController.js      # Request handlers
├── middleware/
│   ├── validators.js          # Request validation
│   └── errorHandler.js        # Error handling
├── routes/
│   └── index.js               # Route definitions
├── utils/
│   ├── mathOperations.js      # Math functions
│   ├── aiService.js           # AI integration
│   └── validators.js          # Input validators
├── .env.example               # Environment template
├── .gitignore
├── index.js                   # Main entry point
├── package.json
├── vercel.json                # Vercel config
└── README.md
```

## Security Features

- Helmet.js for security headers
- Rate limiting (100 req/15min)
- Input validation & sanitization
- Request size limits (10KB)
- CORS enabled
- Error message sanitization

## Error Handling

All errors return consistent format:

```json
{
  "is_success": false,
  "error": "Error description"
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
- `503` - Service Unavailable
- `504` - Gateway Timeout

## Validation Rules

- **fibonacci**: Positive integer, max 50
- **prime**: Array of integers, max 1000 elements
- **lcm/hcf**: Array of integers, 2-100 elements, no zeros for LCM
- **AI**: Non-empty string, max 500 characters
- Exactly one operation per request

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License

## Author

Created for Bajaj Internship Assignment

## Support

For issues or questions, please open an issue on GitHub.

---

**Note:** Keep your `.env` file secure and never commit it to version control.
