const express = require('express');
const router = express.Router();
const Class = require('../models/class.model');

router.post('/', async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create class', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classes', error: err.message });
  }
});

module.exports = router;
