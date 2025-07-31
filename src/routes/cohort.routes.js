const express = require('express');
const router = express.Router();
const cohortController = require('../controllers/cohort.controller');
const { authenticate, authorizeManager, authorizeRoles } = require('../middlewares/auth.middleware');


router.get('/', authenticate, cohortController.getCohorts);
router.get('/:id', authenticate, cohortController.getCohortById);
router.post('/', authenticate, authorizeManager, cohortController.createCohort);
router.put('/:id', authenticate, authorizeManager, cohortController.updateCohort);
router.delete('/:id', authenticate, authorizeManager, cohortController.deleteCohort);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Cohorts
 *   description: Endpoints for managing cohorts
 */

router.get('/', authenticate, cohortController.getCohorts);
/**
 * @swagger
 * /cohorts:
 *   get:
 *     summary: Get all cohorts
 *     tags: [Cohorts]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of cohorts
 */

router.get('/:id', authenticate, cohortController.getCohortById);
/**
 * @swagger
 * /cohorts/{id}:
 *   get:
 *     summary: Get a cohort by ID
 *     tags: [Cohorts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Cohort object
 */

router.post('/', authenticate, authorizeRoles(['manager']), cohortController.createCohort);
/**
 * @swagger
 * /cohorts:
 *   post:
 *     summary: Create a cohort
 *     tags: [Cohorts]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cohort'
 *     responses:
 *       201:
 *         description: Cohort created
 */

router.put('/:id', authenticate, authorizeRoles(['manager']), cohortController.updateCohort);
/**
 * @swagger
 * /cohorts/{id}:
 *   put:
 *     summary: Update a cohort
 *     tags: [Cohorts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cohort'
 *     responses:
 *       200:
 *         description: Cohort updated
 */

router.delete('/:id', authenticate, authorizeRoles(['manager']), cohortController.deleteCohort);
/**
 * @swagger
 * /cohorts/{id}:
 *   delete:
 *     summary: Delete a cohort
 *     tags: [Cohorts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Cohort deleted
 */
