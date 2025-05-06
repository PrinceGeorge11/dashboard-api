const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import authentication middleware
const taskController = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 * name: Tasks
 * description: Task management endpoints
 */

// @route   POST api/projects/:projectId/tasks
// @desc    Create a new task for a project
// @access  Private (Project member)
router.post('/projects/:projectId/tasks', auth, taskController.createTask);

// @route   GET api/projects/:projectId/tasks
// @desc    Get all tasks for a specific project
// @access  Private (Project member)
router.get('/projects/:projectId/tasks', auth, taskController.getTasksByProject);

// @route   GET api/tasks/:id
// @desc    Get a task by ID
// @access  Private (Project member)
router.get('/:id', auth, taskController.getTaskById);

// @route   PUT api/tasks/:id
// @desc    Update a task by ID
// @access  Private (Project member)
router.put('/:id', auth, taskController.updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task by ID
// @access  Private (Project owner or member - adjust as needed)
router.delete('/:id', auth, taskController.deleteTask);


module.exports = router;
