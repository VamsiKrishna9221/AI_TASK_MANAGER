import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="Talk to the AI..."
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", width: "60%", fontSize: "16px" }}
      />
      <button onClick={handleSend} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
