const bcrypt = require('bcrypt');
const User = require('../models/User');

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.json(users);  // Respond with the list of users
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Controller to get a single user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request parameters
  try {
    // Find the user by ID in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);  // Respond with the user data
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
};

// Controller to create a new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;  // Extract name, email, and password from the request body

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,  // Store the hashed password
    });

    // Save the new user to the database
    await newUser.save();

    // Return the newly created user (excluding the password for security)
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    // Handle errors during user creation
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Controller to update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request parameters
  const { name, email, password } = req.body;  // Extract the updated user data from the request body

  try {
    // If a password is provided, hash it before updating
    let updateData = { name, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;  // Include hashed password in the update
    }

    // Update the user data in the database
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user data (excluding password)
    res.json(updatedUser);
  } catch (err) {
    // Handle errors during user update
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Controller to delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request parameters

  try {
    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return a success message
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    // Handle errors during user deletion
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};
