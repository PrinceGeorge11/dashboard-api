const Comment = require('../models/Comment');

// Add a comment to a task
exports.addComment = async (req, res) => {
  const { text, task, user } = req.body;

  try {
    const newComment = new Comment({ text, task, user });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all comments for a task
exports.getCommentsForTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await Comment.find({ task: taskId }).populate('user');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
