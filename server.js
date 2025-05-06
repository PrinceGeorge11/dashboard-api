const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');  // Import swagger-ui-express
const swaggerDocument = require('./src/swagger.json');  // Import the Swagger configuration

// Import route files
const userRoutes = require('./src/routes/userRoutes');

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse incoming JSON requests

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Dashboard API!');
});

// Use routes
app.use('/api/users', userRoutes);  // User-related routes

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
