const express = require('express');
const router = express.Router();
const Class = require('../models/class.model');
const classController = require('../controllers/class.controller'); 
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

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

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Endpoints for managing classes
 */

router.get('/', authenticate, classController.getClasses);
/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of classes
 */

router.get('/:id', authenticate, classController.getClassById);
/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class object
 */

router.post('/', authenticate, authorizeRoles(['manager']), classController.createClass);
/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a class
 *     tags: [Classes]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created
 */

router.put('/:id', authenticate, authorizeRoles(['manager']), classController.updateClass);
/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class updated
 */

router.delete('/:id', authenticate, authorizeRoles(['manager']), classController.deleteClass);
/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Class deleted
 */
