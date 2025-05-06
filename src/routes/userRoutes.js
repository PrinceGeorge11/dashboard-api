const express = require('express');
const router = express.Router();

// Import the userController
const userController = require('../controllers/userController');

// Define the routes and ensure the functions from userController are correctly referenced
router.get('/', userController.getAllUsers);  // Fetch all users
router.get('/:id', userController.getUser);  // Fetch a single user by ID

module.exports = router;
