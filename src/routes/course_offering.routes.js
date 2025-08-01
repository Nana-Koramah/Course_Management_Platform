const express = require('express');
const router = express.Router();
const courseOfferingController = require('../controllers/course_offering.controller');
const { authenticate, authorizeManager, authorizeRoles } = require('../middlewares/auth.middleware');
const app = express();

app.use(express.json());


// Public or authenticated read routes
router.get('/', authenticate, courseOfferingController.getCourseOfferings);
router.get('/:id', authenticate, courseOfferingController.getCourseOfferingById);

// Manager-only write routes
router.post('/', authenticate, authorizeManager, courseOfferingController.createCourseOffering);
router.put('/:id', authenticate, authorizeManager, courseOfferingController.updateCourseOffering);
router.delete('/:id', authenticate, authorizeManager, courseOfferingController.deleteCourseOffering);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Course Offerings
 *   description: Endpoints for managing course offerings
 */

router.get('/', authenticate, courseOfferingController.getCourseOfferings);
/**
 * @swagger
 * /course-offerings:
 *   get:
 *     summary: Get all course offerings
 *     tags: [Course Offerings]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of course offerings
 */

router.get('/:id', authenticate, courseOfferingController.getCourseOfferingById);
/**
 * @swagger
 * /course-offerings/{id}:
 *   get:
 *     summary: Get a course offering by ID
 *     tags: [Course Offerings]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course offering object
 */

router.post('/', authenticate, authorizeRoles(['manager']), courseOfferingController.createCourseOffering);
/**
 * @swagger
 * /course-offerings:
 *   post:
 *     summary: Create a course offering
 *     tags: [Course Offerings]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseOffering'
 *     responses:
 *       201:
 *         description: Course offering created
 */

router.put('/:id', authenticate, authorizeRoles(['manager']), courseOfferingController.updateCourseOffering);
/**
 * @swagger
 * /course-offerings/{id}:
 *   put:
 *     summary: Update a course offering
 *     tags: [Course Offerings]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseOffering'
 *     responses:
 *       200:
 *         description: Course offering updated
 */

router.delete('/:id', authenticate, authorizeRoles(['manager']), courseOfferingController.deleteCourseOffering);
/**
 * @swagger
 * /course-offerings/{id}:
 *   delete:
 *     summary: Delete a course offering
 *     tags: [Course Offerings]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Course offering deleted
 */
