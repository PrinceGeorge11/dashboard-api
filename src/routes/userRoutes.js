const express = require('express');
const router = express.Router();

// Import the userController
const userController = require('../controllers/userController');

// Define the routes and ensure the functions from userController are correctly referenced
router.get('/', userController.getAllUsers);  // Fetch all users
router.get('/:id', userController.getUser);  // Fetch a single user by ID
router.post('/', userController.createUser);  // Create a new user
router.put('/:id', userController.updateUser);  // Update user by ID (added this line)
router.delete('/:id', userController.deleteUser);  // Delete user by ID

module.exports = router;

