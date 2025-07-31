const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');
const { authenticate, authorizeManager } = require('../middlewares/auth.middleware');

router.get('/', authenticate, managerController.getManagers);
router.get('/:id', authenticate, managerController.getManagerById);
router.post('/', authenticate, authorizeManager, managerController.createManager);
router.put('/:id', authenticate, authorizeManager, managerController.updateManager);
router.delete('/:id', authenticate, authorizeManager, managerController.deleteManager);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: Manager management
 */

/**
 * @swagger
 * /managers:
 *   get:
 *     summary: Get all managers
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of managers
 */
router.get('/', authenticate, managerController.getManagers);

/**
 * @swagger
 * /managers/{id}:
 *   get:
 *     summary: Get manager by ID
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A manager object
 */
router.get('/:id', authenticate, managerController.getManagerById);

/**
 * @swagger
 * /managers:
 *   post:
 *     summary: Create a new manager
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Manager created
 */
router.post('/', authenticate, authorizeManager, managerController.createManager);

/**
 * @swagger
 * /managers/{id}:
 *   put:
 *     summary: Update a manager
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Manager updated
 */
router.put('/:id', authenticate, authorizeManager, managerController.updateManager);

/**
 * @swagger
 * /managers/{id}:
 *   delete:
 *     summary: Delete a manager
 *     tags: [Managers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Manager deleted
 */
router.delete('/:id', authenticate, authorizeManager, managerController.deleteManager);
