// src/routes/gts.js
const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');
const Trainer = require('../models/Trainer');

// GET: List all Pokémon available on the GTS
router.get('/list', async (req, res) => {
    try {
      const availablePokemon = await Pokemon.find({ onGTS: true }).populate('owner', 'name trainerId');
      res.json(availablePokemon);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve GTS listings' });
    }
  });

// POST: Add a Pokémon to the GTS
router.post('/add', async (req, res) => {
  try {
      const { species, level, moves, trainerId } = req.body;

      // Find the trainer
      const trainer = await Trainer.findOne({ trainerId });
      if (!trainer) {
          return res.status(400).json({ message: 'Trainer not found' });
      }

      // Create a new Pokémon
      const newPokemon = new Pokemon({
          species,
          level,
          moves,
          owner: trainer._id,
          onGTS: true 
      });

      await newPokemon.save();
      res.status(201).json({ message: 'Pokémon added to GTS successfully', pokemon: newPokemon });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add Pokémon to GTS' });
  }
});

// Other GTS routes (search, request, etc.) will be added here

module.exports = router;
