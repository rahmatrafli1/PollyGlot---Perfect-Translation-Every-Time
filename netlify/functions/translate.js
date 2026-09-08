const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { text, language } = JSON.parse(event.body);

    if (!text || !language) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Text and language are required." }),
      };
    }

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the given text into ${language}. Only respond with the translation, no explanations or extra text.`,
        },
        { role: "user", content: text },
      ],
      temperature: 1,
      max_completion_tokens: 500,
    });

    const translation = completion.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ translation }),
    };
  } catch (error) {
    console.error("Translation error:", error);
    return {
      statusCode: error?.status || 500,
      body: JSON.stringify({
        error:
          error?.error?.message ||
          error?.message ||
          "Failed to translate text.",
      }),
    };
  }
};
