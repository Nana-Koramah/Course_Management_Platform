const express = require('express');
const router = express.Router();
const Module = require('../models/module.model');

router.post('/', async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json(module);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create module', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching modules', error: err.message });
  }
});

module.exports = router;
