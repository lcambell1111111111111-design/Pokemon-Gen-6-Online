const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  offerer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  offeredPokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  requestedPokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
  tradeType: { type: String, enum: ['normal', 'wonder'], default: 'normal' }, // Add this Line
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
