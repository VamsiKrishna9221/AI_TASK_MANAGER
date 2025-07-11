# 🧠 AI-Powered Task Management Tool

An intelligent task manager powered by OpenRouter (GPT-based) and built using:

- 🧠 OpenRouter (ChatGPT-compatible models)
- 🖥️ Node.js + Express backend
- 🌐 React.js frontend

---

## 📦 Features

- Natural language interaction to:
  - ✅ Create tasks
  - ✅ List current tasks
  - ✅ Delete tasks
- AI assistant that converts chat input into structured commands
- Clean and simple UI
- Backend REST APIs for full task management

---

## 🛠 Tech Stack

| Layer     | Stack                        |
|-----------|------------------------------|
| Frontend  | React.js                     |
| Backend   | Node.js, Express.js          |
| AI/NLP    | OpenRouter (ChatGPT models)  |
| Database  | In-memory (can add MongoDB)  |

---

## 🚀 Getting Started

🔧 1. Setup the Backend
cd server
npm install
Create a .env file inside the server/ folder with your API key:
OPENROUTER_API_KEY=sk-...
Then run the backend server:
node app.js
Your backend will be available at: http://localhost:5000

🌐 2. Setup the Frontend
cd ../client
npm install
npm start
The React frontend will open automatically at: http://localhost:3000
