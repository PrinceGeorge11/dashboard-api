const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  const { name, description, startDate, endDate, users } = req.body;

  try {
    const newProject = new Project({ name, description, startDate, endDate, users });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('users');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single project
exports.getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate('users');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, users } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, {
      name,
      description,
      startDate,
      endDate,
      users
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
