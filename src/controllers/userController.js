const User = require('../models/User');

// Controller to create a new user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    const newUser = new User({
      name,
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Return the newly created user
    res.status(201).json(newUser);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Controller to update user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the request parameters
  const { name, email } = req.body;  // Extract the updated user data from the request body

  try {
    // Find the user by ID and update their data
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user
    res.json(updatedUser);
  } catch (err) {
    // Handle any errors
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
    // Handle any errors that occur during the process
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};
