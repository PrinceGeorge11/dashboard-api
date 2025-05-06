const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { name, description, status, dueDate, project, assignedTo } = req.body;

  try {
    const newTask = new Task({ name, description, status, dueDate, project, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('project').populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate('project').populate('assignedTo');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, dueDate, project, assignedTo } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, {
      name,
      description,
      status,
      dueDate,
      project,
      assignedTo
    }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
