const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trainerId: { type: String, unique: true, required: true }, // Unique identifier
  onlineStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model('Trainer', trainerSchema);
