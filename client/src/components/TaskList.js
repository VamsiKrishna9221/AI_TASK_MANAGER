import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div style={{ marginTop: "20px", textAlign: "left", padding: "20px" }}>
      <h2>📝 Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> – {task.status} – {task.dueDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
