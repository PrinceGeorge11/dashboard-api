const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import authentication middleware
const projectController = require('../controllers/projectController');

/**
 * @swagger
 * tags:
 * name: Projects
 * description: Project management endpoints
 */

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post('/', auth, projectController.createProject);

// @route   GET api/projects
// @desc    Get all projects (user is a member of)
// @access  Private
router.get('/', auth, projectController.getProjects);

// @route   GET api/projects/:id
// @desc    Get a project by ID
// @access  Private
router.get('/:id', auth, projectController.getProjectById);

// @route   PUT api/projects/:id
// @desc    Update a project by ID
// @access  Private (Owner only)
router.put('/:id', auth, projectController.updateProject);

// @route   DELETE api/projects/:id
// @desc    Delete a project by ID
// @access  Private (Owner only)
router.delete('/:id', auth, projectController.deleteProject);

// @route   POST api/projects/:projectId/members
// @desc    Add a member to a project
// @access  Private (Owner only)
router.post('/:projectId/members', auth, projectController.addMember);

// @route   DELETE api/projects/:projectId/members/:userId
// @desc    Remove a member from a project
// @access  Private (Owner only)
router.delete('/:projectId/members/:userId', auth, projectController.removeMember);


module.exports = router;
