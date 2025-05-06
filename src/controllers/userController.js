const User = require('../models/User');

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.json(users);  // Respond with the list of users
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Controller to get a single user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request parameters
  try {
    // Find the user by ID in the database
    const user = await User.findById(id);
    if (!user) {
      // If the user does not exist, return a 404 error
      return res.status(404).json({ message: 'User not found' });
    }
    // Return the user data as a response
    res.json(user);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Controller to update user details
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request parameters
  const { name, email } = req.body;  // Extract name and email from the request body

  try {
    // Update user data in the database
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Respond with the updated user data
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Controller to delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request parameters

  try {
    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Respond with a success message
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
