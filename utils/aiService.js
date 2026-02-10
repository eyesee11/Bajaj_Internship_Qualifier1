// ai service integration

const axios = require("axios");

// query gemini ai
async function queryGeminiAI(question) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("gemini api key not configured");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `answer in 1-3 words: ${question}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 20,
      topP: 0.8,
      topK: 10,
    },
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("invalid ai response format");
    }

    let answer = response.data.candidates[0].content.parts[0].text.trim();

    // extract first word/phrase
    answer = answer.split("\n")[0].trim();
    answer = answer.replace(/^(Answer:|A:)\s*/i, "");

    // limit to short phrase
    const words = answer.split(/\s+/);
    if (words.length > 3) {
      answer = words.slice(0, 3).join(" ");
    }

    return answer;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 429) {
        throw new Error("ai api rate limit exceeded");
      } else if (status === 401 || status === 403) {
        throw new Error("invalid ai api key");
      } else if (status === 400) {
        throw new Error("invalid ai request");
      }
      throw new Error(`ai api error: ${error.response.statusText}`);
    } else if (error.code === "ECONNABORTED") {
      throw new Error("ai request timeout");
    }
    throw new Error("ai service unavailable");
  }
}

module.exports = {
  queryGeminiAI,
};
