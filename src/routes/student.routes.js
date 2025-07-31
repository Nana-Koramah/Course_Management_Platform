const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

// GET routes – accessible by both managers and facilitators
router.get('/', authenticate, authorizeRoles(['manager', 'facilitator']), studentController.getStudents);
router.get('/:id', authenticate, authorizeRoles(['manager', 'facilitator']), studentController.getStudentById);

// POST, PUT, DELETE – only accessible by managers
router.post('/', authenticate, authorizeRoles(['manager']), studentController.createStudent);
router.put('/:id', authenticate, authorizeRoles(['manager']), studentController.updateStudent);
router.delete('/:id', authenticate, authorizeRoles(['manager']), studentController.deleteStudent);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 */
router.get('/', authenticate, authorizeRoles(['manager', 'facilitator']), studentController.getStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
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
 *         description: A student object
 */
router.get('/:id', authenticate, authorizeRoles(['manager', 'facilitator']), studentController.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Student created
 */
router.post('/', authenticate, authorizeRoles(['manager']), studentController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
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
 *         description: Student updated
 */
router.put('/:id', authenticate, authorizeRoles(['manager']), studentController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
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
 *         description: Student deleted
 */
router.delete('/:id', authenticate, authorizeRoles(['manager']), studentController.deleteStudent);
