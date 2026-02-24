// src/server.js
const http = require('http');
const app = require('./app');
const connectDB = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Start listening
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
