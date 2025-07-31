const express = require('express');
const router = express.Router();
const allocationController = require('../controllers/allocation.controller');
const { authenticate, authorizeManager } = require('../middlewares/auth.middleware');

// Public (or protected) view
router.get('/', authenticate, allocationController.getAllocations);
router.get('/:id', authenticate, allocationController.getAllocationById);
router.get('/facilitator/dashboard', authenticate, allocationController.facilitatorDashboard);



// Manager-only
router.get('/manager/dashboard', authenticate, authorizeManager, allocationController.managerDashboard);
router.post('/', authenticate, authorizeManager, allocationController.createAllocation);
router.put('/:id', authenticate, authorizeManager, allocationController.updateAllocation);
router.delete('/:id', authenticate, authorizeManager, allocationController.deleteAllocation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Allocation
 *   description: Manage facilitator-course allocations
 */

/**
 * @swagger
 * /allocations:
 *   get:
 *     summary: Get all allocations
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of allocations
 */

/**
 * @swagger
 * /allocations/{id}:
 *   get:
 *     summary: Get allocation by ID
 *     tags: [Allocation]
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
 *         description: Allocation data
 */

/**
 * @swagger
 * /allocations/facilitator/dashboard:
 *   get:
 *     summary: Facilitator dashboard data
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard info for facilitator
 */

/**
 * @swagger
 * /allocations/manager/dashboard:
 *   get:
 *     summary: Manager dashboard data
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard info for manager
 */

/**
 * @swagger
 * /allocations:
 *   post:
 *     summary: Create a new allocation
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Allocation created
 */

/**
 * @swagger
 * /allocations/{id}:
 *   put:
 *     summary: Update an allocation
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Allocation updated
 */

/**
 * @swagger
 * /allocations/{id}:
 *   delete:
 *     summary: Delete an allocation
 *     tags: [Allocation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Allocation deleted
 */
