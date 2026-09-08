require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;
const URL_PROTOCOL = process.env.URL;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const allowedOrigins = [
  `https://${BASE_URL}`,
  `${URL_PROTOCOL}:5173`,
  `${URL_PROTOCOL}:${PORT}`,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.static(__dirname));

// Translate endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({
        error: "Text and language are required.",
      });
    }

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the given text into ${language}. Only respond with the translation, no explanations or extra text.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 1,
      max_completion_tokens: 500,
    });

    const translation = completion.choices[0].message.content.trim();

    res.json({ translation });
  } catch (error) {
    console.error("=== Translation error (FULL) ===");
    console.error("Status:", error?.status);
    console.error("Code:", error?.code);
    console.error("Type:", error?.type);
    console.error("Message:", error?.message);
    console.error("Error object:", JSON.stringify(error?.error, null, 2));
    console.error("Full error:", error);

    res.status(error?.status || 500).json({
      error:
        error?.error?.message ||
        error?.message ||
        "Failed to translate text. Please check your API key/model and try again.",
    });
  }
});

// Fallback route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🦜 PollyGlot server running on ${URL_PROTOCOL}:${PORT}`);
  console.log(`Base URL: ${BASE_URL}`);
});
