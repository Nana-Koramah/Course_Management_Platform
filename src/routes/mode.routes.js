const express = require('express');
const router = express.Router();
const Mode = require('../models/mode.model');

router.post('/', async (req, res) => {
  try {
    const mode = await Mode.create(req.body);
    res.status(201).json(mode);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create mode', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const modes = await Mode.findAll();
    res.json(modes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching modes', error: err.message });
  }
});

module.exports = router;
