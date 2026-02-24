// src/services/matchmakingService.js
const Trainer = require('../models/Trainer');

const battleQueue = [];

const joinBattleQueue = async (trainerId) => {
  const trainer = await Trainer.findById(trainerId);
  if (!trainer) {
    throw new Error('Trainer not found');
  }

  battleQueue.push(trainerId);
  console.log(`Trainer ${trainerId} joined the battle queue.`);

  // Attempt to find a match
  if (battleQueue.length >= 2) {
    const trainer1 = battleQueue.shift();
    const trainer2 = battleQueue.shift();
    console.log(`Match found: ${trainer1} vs ${trainer2}`);
    return { trainer1, trainer2 }; // Return the matched trainers
  }

  return null; // No match found
};

module.exports = { joinBattleQueue };
