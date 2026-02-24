const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  species: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  moves: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' } // Reference to the Trainer model
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
