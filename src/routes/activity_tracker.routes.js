const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity_tracker.controller');
const {
  authenticate,
  authorizeFacilitatorSelf,
  authorizeManager
} = require('../middlewares/auth.middleware');

//Facilitators: submit new log
router.post('/', authenticate, authorizeFacilitatorSelf, activityController.submitActivityLog);

//Facilitators: update existing log
router.put('/:id', authenticate, authorizeFacilitatorSelf, activityController.submitActivityLog);

//Facilitators: view their own logs
router.get('/my-logs', authenticate, authorizeFacilitatorSelf, activityController.getFacilitatorLogs);

//Managers: view all logs (filter by facilitator, course, or week)
router.get('/', authenticate, authorizeManager, activityController.getAllLogs);

//Facilitators: delete their own log
router.delete('/:id', authenticate, authorizeFacilitatorSelf, activityController.deleteLog);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ActivityTracker
 *   description: Endpoints for logging facilitator activities
 */

/**
 * @swagger
 * /activity-logs:
 *   post:
 *     summary: Submit a new activity log
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allocationId:
 *                 type: integer
 *               week:
 *                 type: integer
 *               gradingCompleted:
 *                 type: boolean
 *               attendanceTaken:
 *                 type: boolean
 *               deadlineCommunicated:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Activity log submitted
 */

/**
 * @swagger
 * /activity-logs/{id}:
 *   put:
 *     summary: Update an existing activity log
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityLog'
 *     responses:
 *       200:
 *         description: Activity log updated
 */

/**
 * @swagger
 * /activity-logs/my-logs:
 *   get:
 *     summary: Get own activity logs
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns logs of the logged-in facilitator
 */

/**
 * @swagger
 * /activity-logs:
 *   get:
 *     summary: Get all activity logs (manager only)
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: facilitatorId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: week
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of all activity logs
 */

/**
 * @swagger
 * /activity-logs/{id}:
 *   delete:
 *     summary: Delete a specific activity log
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Log deleted
 */
