const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const aiAgent = require("./services/aiAgent");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ AI route (safe logging)
app.post("/ai-agent", async (req, res) => {
  try {
    const { message } = req.body;
    const result = await aiAgent(message);
    res.json(result);
  } catch (err) {
    // ❗Do NOT send the raw error object — send just message
    console.error("❌ Failed in /ai-agent:", err.message);
    res.status(500).json({ message: "AI failed to process your input" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
