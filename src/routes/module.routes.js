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

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Course modules
 */

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Module created
 */


/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: List of modules
 */

