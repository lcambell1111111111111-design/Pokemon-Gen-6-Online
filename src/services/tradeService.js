// src/services/tradeService.js
const Trade = require('../models/Trade');
const Pokemon = require('../models/Pokemon');

const acceptTrade = async (tradeId) => {
  const trade = await Trade.findById(tradeId);
  if (!trade) {
    throw new Error('Trade not found');
  }

  trade.status = 'accepted';
  await trade.save();
  return trade;
};

const wonderTradeQueue = [];

const initiateWonderTrade = async (offererId, offeredPokemonId) => {
    const trade = new Trade({
        offerer: offererId,
        offeredPokemon: offeredPokemonId,
        tradeType: 'wonder',
        status: 'pending'
    });

    wonderTradeQueue.push(trade);

    // Attempt to match the trade if there are at least two trades in the queue
    if (wonderTradeQueue.length >= 2) {
        const trade1 = wonderTradeQueue.shift();
        const trade2 = wonderTradeQueue.shift();

        // Complete the trades by swapping the Pokemon
        const temp = trade1.offeredPokemon;
        trade1.recipient = trade2.offerer;
        trade1.requestedPokemon = trade2.offeredPokemon;
        trade1.status = 'completed';

        trade2.recipient = trade1.offerer;
        trade2.requestedPokemon = temp;
        trade2.status = 'completed';

        await trade1.save();
        await trade2.save();

        return trade1; // Return the completed trade for the offerer
    }

    await trade.save();
    return trade; // Return the trade for the offerer
};

const retrieveWonderTrade = async (trainerId) => {
    const trade = await Trade.findOne({
        recipient: trainerId,
        tradeType: 'wonder',
        status: 'completed'
    }).populate('offerer').populate('offeredPokemon');

    if (trade) {
        trade.status = 'retrieved';
        await trade.save();
    }

    return trade;
};

module.exports = { acceptTrade, initiateWonderTrade, retrieveWonderTrade };
