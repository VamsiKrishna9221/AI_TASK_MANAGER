import React, { useState, useEffect } from "react";
import ChatInput from "./components/ChatInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [response, setResponse] = useState(null);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAICommand = async (message) => {
    const res = await fetch("http://localhost:5000/ai-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data);

    if (data.action === "createTask") {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.data),
      });
      fetchTasks();
    } else if (data.action === "deleteTask") {
      const title = data.data?.title?.toLowerCase();
      const task = tasks.find((t) => t.title.toLowerCase() === title);
      if (task) {
        await fetch(`http://localhost:5000/tasks/${task.id}`, { method: "DELETE" });
        fetchTasks();
      }
    } else if (data.action === "listTasks") {
      fetchTasks();
    }
  };

  return (
    <div className="App">
      <h1>🧠 AI Task Manager</h1>
      <ChatInput onSend={handleAICommand} />
      {response && (
        <pre style={{ textAlign: "left", marginTop: "10px" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
