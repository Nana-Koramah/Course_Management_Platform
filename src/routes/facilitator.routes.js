const express = require('express');
const router = express.Router();
const Facilitator = require('../models/facilitator.model');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const facilitatorController = require('../controllers/facilitator.controller');


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

/**
 * @swagger
 * tags:
 *   name: Facilitators
 *   description: Endpoints for managing facilitators
 */

router.get('/', authenticate, facilitatorController.getFacilitators);
/**
 * @swagger
 * /facilitators:
 *   get:
 *     summary: Get all facilitators
 *     tags: [Facilitators]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of facilitators
 */

router.get('/:id', authenticate, facilitatorController.getFacilitatorById);
/**
 * @swagger
 * /facilitators/{id}:
 *   get:
 *     summary: Get a facilitator by ID
 *     tags: [Facilitators]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Facilitator object
 */

router.post('/', authenticate, authorizeRoles(['manager']), facilitatorController.createFacilitator);
/**
 * @swagger
 * /facilitators:
 *   post:
 *     summary: Create a facilitator
 *     tags: [Facilitators]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Facilitator'
 *     responses:
 *       201:
 *         description: Facilitator created
 */

router.put('/:id', authenticate, authorizeRoles(['manager']), facilitatorController.updateFacilitator);
/**
 * @swagger
 * /facilitators/{id}:
 *   put:
 *     summary: Update a facilitator
 *     tags: [Facilitators]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Facilitator'
 *     responses:
 *       200:
 *         description: Facilitator updated
 */

router.delete('/:id', authenticate, authorizeRoles(['manager']), facilitatorController.deleteFacilitator);
/**
 * @swagger
 * /facilitators/{id}:
 *   delete:
 *     summary: Delete a facilitator
 *     tags: [Facilitators]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Facilitator deleted
 */

