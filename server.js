// This file will serve the test question data for the application
// In a production environment, this would be replaced with a proper backend API

// Create a simple Express server to serve the JSON files
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Endpoint to get test questions by length
app.get('/api/questions/:length', (req, res) => {
  const { length } = req.params;
  
  // Validate the length parameter
  if (!['15', '30', '45'].includes(length)) {
    return res.status(400).json({ error: 'Invalid test length. Must be 15, 30, or 45.' });
  }
  
  const filePath = path.join(__dirname, `test_${length}.json`);
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Test with length ${length} not found.` });
  }
  
  // Read the file and send the JSON response
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(data);
    res.json(questions);
  } catch (error) {
    console.error(`Error reading test_${length}.json:`, error);
    res.status(500).json({ error: 'Failed to load questions.' });
  }
});

// Endpoint to get all categories
app.get('/api/categories', (req, res) => {
  const filePath = path.join(__dirname, 'question_categories.json');
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Categories not found.' });
  }
  
  // Read the file and send the JSON response
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const categories = JSON.parse(data);
    res.json(categories);
  } catch (error) {
    console.error('Error reading question_categories.json:', error);
    res.status(500).json({ error: 'Failed to load categories.' });
  }
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test API available at http://localhost:${PORT}/api/questions/[15|30|45]`);
  console.log(`Categories API available at http://localhost:${PORT}/api/categories`);
});
