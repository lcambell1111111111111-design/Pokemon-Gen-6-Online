// src/app.js
const express = require('express');
const cors = require('cors');
const gtsRoutes = require('./routes/gts');
const tradeRoutes = require('./routes/trade');
const battleRoutes = require('./routes/battle');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/gts', gtsRoutes);
app.use('/trade', tradeRoutes);
app.use('/battle', battleRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Pokémon Online Server is running!');
});

module.exports = app;
