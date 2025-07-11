const axios = require("axios");

const aiAgent = async (userInput) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `You are a task assistant. Convert the user's natural language input into a valid JSON command.

Respond ONLY with a valid JSON object like:
{
  "action": "createTask" | "updateTask" | "listTasks" | "deleteTask",
  "data": {
    "title": "...",
    "dueDate": "...",
    "status": "Not Started" | "In Progress" | "Completed"
  }
}

If fields like "dueDate" are missing, use null or an empty string. DO NOT add explanation — return JSON only.`,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices[0]?.message?.content?.trim();
    console.log("🧠 OpenRouter RAW Response:\n", text);

    // Try to parse the returned string as JSON
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (jsonErr) {
      console.error("❌ Failed to parse AI response as JSON:", jsonErr.message);
      throw new Error("AI responded with invalid JSON.");
    }
  } catch (err) {
    if (err.response?.data) {
      console.error("❌ OpenRouter API Error:");
      console.error("Status:", err.response.status);
      console.error("Message:", err.response.data?.error || JSON.stringify(err.response.data));
    } else {
      console.error("❌ Unexpected Error Message:", err.message);
    }

    throw new Error("AI failed to process your input");
  }
};

module.exports = aiAgent;
