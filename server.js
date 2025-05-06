const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import route files
const userRoutes = require('./src/routes/userRoutes');

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use routes
app.use('/api/users', userRoutes);  // User-related routes

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
