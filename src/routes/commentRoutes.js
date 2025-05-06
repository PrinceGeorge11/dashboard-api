const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import authentication middleware
const commentController = require('../controllers/commentController');

/**
 * @swagger
 * tags:
 * name: Comments
 * description: Comment management endpoints
 */

// @route   POST api/tasks/:taskId/comments
// @desc    Add a comment to a task
// @access  Private (Project member)
router.post('/tasks/:taskId/comments', auth, commentController.addComment);

// @route   GET api/tasks/:taskId/comments
// @desc    Get all comments for a specific task
// @access  Private (Project member)
router.get('/tasks/:taskId/comments', auth, commentController.getCommentsByTask);

// @route   DELETE api/comments/:id
// @desc    Delete a comment by ID
// @access  Private (Comment author or Project owner - adjust as needed)
router.delete('/:id', auth, commentController.deleteComment);


module.exports = router;
