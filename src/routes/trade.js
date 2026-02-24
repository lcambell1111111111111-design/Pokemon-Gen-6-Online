// src/routes/trade.js
const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');
const tradeService = require('../services/tradeService'); // Import tradeService
const Pokemon = require('../models/Pokemon');

// POST: Create a new trade offer
router.post('/offer', async (req, res) => {
    try {
      const { offerer, offeredPokemon, recipient, requestedPokemon } = req.body;
  
      const newTrade = new Trade({
        offerer,
        offeredPokemon,
        recipient,
        requestedPokemon,
      });
  
      await newTrade.save();
      res.status(201).json({ message: 'Trade offer created', trade: newTrade });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create trade offer' });
    }
  });
  
  // GET: List all pending trades for a user
  router.get('/pending/:trainerId', async (req, res) => {
    try {
      const trainerId = req.params.trainerId;
      const pendingTrades = await Trade.find({
        $or: [{ offerer: trainerId }, { recipient: trainerId }],
        status: 'pending',
      }).populate('offerer', 'name').populate('offeredPokemon', 'species');
      res.json(pendingTrades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve pending trades' });
    }
  });

// POST: Initiate Wonder Trade
router.post('/wonder-trade', async (req, res) => {
    try {
        const { offerer, offeredPokemon } = req.body;

        const wonderTrade = await tradeService.initiateWonderTrade(offerer, offeredPokemon);

        res.status(201).json({ message: 'Wonder Trade initiated', trade: wonderTrade });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to initiate Wonder Trade' });
    }
});

// GET: Retrieve Wonder Trade
router.get('/wonder-trade/retrieve/:trainerId', async (req, res) => {
    try {
        const { trainerId } = req.params;
        const trade = await tradeService.retrieveWonderTrade(trainerId);

        if (!trade) {
            return res.status(404).json({ message: 'No Wonder Trade available' });
        }

        res.status(200).json({ message: 'Wonder Trade retrieved', trade });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve Wonder Trade' });
    }
});

// Other trade-related routes (accept, reject, etc.) will be added here

module.exports = router;
