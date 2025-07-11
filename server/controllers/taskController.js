const tasks = require('../models/tasks');

exports.createTask = (req, res) => {
  const task = { id: Date.now().toString(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
};

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.updateTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    return res.json(tasks[index]);
  }
  res.status(404).json({ message: "Task not found" });
};

exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    const deleted = tasks.splice(index, 1);
    return res.json(deleted);
  }
  res.status(404).json({ message: "Task not found" });
};
