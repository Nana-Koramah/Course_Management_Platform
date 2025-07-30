const express = require('express');
const router = express.Router();
const Facilitator = require('../models/facilitator.model');

router.post('/', async (req, res) => {
  try {
    const facilitator = await Facilitator.create(req.body);
    res.status(201).json(facilitator);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create facilitator', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const facilitators = await Facilitator.findAll();
    res.json(facilitators);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching facilitators', error: err.message });
  }
});

module.exports = router;
